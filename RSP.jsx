import React, { useState, useEffect, useRef } from 'react';

// 클래시의 경우 -> constructor  -> render -> ref -> componentDidMount
// -> (setState/props 바뀔 때 -> shouldComponentUpdate -> render -> componentDidUpdate)
// 부모가 나를 없앴을 때 -> componentWillMount -> 소멸

// componentDidMount() {
//     this.setState({
//         imgCoord: 3,
//         score: 1,
//         result: 2,
//     })
// }

// useEffect(() => {
//     setImgCoord();
//     setScore();
// }, [imgCoord, score]);
// useEffect(() => {
//     setResult();
// }, [result]);

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
    return Object.entries(rspCoords).find((v) => {
        return v[1] === imgCoord;
    })[0];
};

const RSP = () => {
    const [result, setResult] = useState('');
    const [imgCoord, setImgCoord] = useState(rspCoords.바위);
    const [score, setScore] = useState(0);
    const interval = useRef();

    // 함수 컴포넌트 안에서 작성해야 함, 배열에는 꼭 useEffect를 다시 실행할 값만 넣으세요.
    useEffect(() => { // componentDidMount, componentDidUpdate 역할 (1 : 1 대응은 아님)
        console.log('다시 실행');
        interval.current = setInterval(changeHandle, 500);
        return () => { // componentWillUnmount 역할
            console.log('종료');
            clearInterval(interval.current);
        }
    }, [imgCoord]);

    const changeHandle = () => {
        if (imgCoord === rspCoords.바위) {
            setImgCoord(rspCoords.가위)
        } else if (imgCoord === rspCoords.가위) {
            setImgCoord(rspCoords.보)
        } else if (imgCoord === rspCoords.보) {
            setImgCoord(rspCoords.바위)
        }
    };

    const onClickBtn = (choice) => () => {
        clearInterval(interval.current);
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

    return (
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

export default RSP;