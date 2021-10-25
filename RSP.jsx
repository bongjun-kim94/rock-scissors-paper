import React, { useState, useCallback, useRef } from 'react';

// 클래시의 경우 -> constructor  -> render -> ref -> componentDidMount
// -> (setState/props 바뀔 때 -> shouldComponentUpdate -> render -> componentDidUpdate)
// 부모가 나를 없앴을 때 -> componentWillMount -> 소멸

const rspCoords = {
    바위: '0',
    가위: '-142px',
    보: '-284px',
};

const scores = {
    가위: 1,
    바위: 0,
    보: -1,
};

const computerChoice = (imgCoord) => {
    return Object.entries(rspCoords).find(function (v) {
        return v[1] === imgCoord;
    })[0];
};

const RSP = () => {
    const [result, setResult] = useState('');
    const [imgCoord, setImgCoord] = useState(rspCoords.바위);
    const [score, setScore] = useState(0);
    const interval = useRef();

    const changeHandle = () => {
        if (imgCoord === rspCoords.바위) {
            setImgCoord(rspCoords.가위)
        } else if (imgCoord === rspCoords.가위) {
            setImgCoord(rspCoords.보)
        } else if (imgCoord === rspCoords.보) {
            setImgCoord(rspCoords.바위)
        }
    };

    const onClickBtn = (choice) => {
        const { imgCoord } = this.state;
        clearInterval(this.interval);
        const myScore = scores[choice];
        const cpuScore = scores[computerChoice(imgCoord)];
        const diff = myScore - cpuScore;
        if (diff === 0) {
            setResult('비겼습니다!');
        } else if ([-1, 2].includes(diff)) {
            setResult('이겼습니다!');
            setScore((prevScore) => prevScore + 1);
        } else {
            setResult('졌습니다!');
            setScore((prevScore) => prevScore - 1);
        }
        setTimeout(() => {
            interval.current = setInterval(changeHandle, 500);
        }, 2000);
    };

    return(
        <>
            <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`}} />
            <div>
                <button id="rock" className="btn" onClick={() => { onClickBtn('바위')}}>바위</button>
                <button id="scissors" className="btn" onClick={() => { onClickBtn('가위')}}>가위</button>
                <button id="paper" className="btn" onClick={() => { onClickBtn('보')}}>보</button>
            </div>
            <div>{result}</div>
            <div>현재 {score}점</div>
        </>
    );
}

class RSP extends Component {
    state = {
        result: '',
        imgCoord: 0,
        score: 0,
    };

    interval;

    componentDidMount() { // 컴포넌트가 첫 렌더링 될 때, 여기에 비동기 요청을 많이함
        this.interval = setInterval(this.changeHandle, 500);
    }
    
    componentDidUpdate() { // 리렌더링 후

    }

    componentWillUnmount() { // 컴포넌트가 제거되기 직전, 비동기 요청 정리
        clearInterval(this.interval);
    }

    changeHandle = () => {
        const { imgCoord } = this.state;
        if (imgCoord === rspCoords.바위) {
            this.setState({
                imgCoord: rspCoords.가위,
            });
        } else if (imgCoord === rspCoords.가위) {
            this.setState({
                imgCoord: rspCoords.보,
            });
        } else if (imgCoord === rspCoords.보) {
            this.setState({
                imgCoord: rspCoords.바위,
            });
        }
    };

    onClickBtn = (choice) => {
        const { imgCoord } = this.state;
        clearInterval(this.interval);
        const myScore = scores[choice];
        const cpuScore = scores[computerChoice(imgCoord)];
        const diff = myScore - cpuScore;
        if (diff === 0) {
            this.setState({
                result: '비겼습니다!',
            });
        } else if ([-1, 2].includes(diff)) {
            this.setState((prevState) => {
                return {
                    result: '이겼습니다!',
                    score: prevState.score + 1,
                };
            });
        } else {
            this.setState((prevState) => {
                return {
                    result: '졌습니다!',
                    score: prevState.score - 1,
                };
            });
        }
        setTimeout(() => {
            this.interval = setInterval(this.changeHandle, 500);
        }, 2000);
    };

    render() {
        const { result, score, imgCoord } = this.state;
        return(
            <>
                <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`}} />
                <div>
                    <button id="rock" className="btn" onClick={() => { onClickBtn('바위')}}>바위</button>
                    <button id="scissors" className="btn" onClick={() => { onClickBtn('가위')}}>가위</button>
                    <button id="paper" className="btn" onClick={() => { onClickBtn('보')}}>보</button>
                </div>
                <div>{result}</div>
                <div>현재 {score}점</div>
            </>
        );
    }
}

export default RSP;