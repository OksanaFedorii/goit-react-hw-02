const Options = ({ onUpdateFeedback }) => {
    const handleFeedback = (type) => {
        onUpdateFeedback(type);
    };

    return (
        <>
            <button onClick={() => handleFeedback("good")}>Good</button>
            <button onClick={() => handleFeedback("neutral")}>Neutral</button>
            <button onClick={() => handleFeedback("bad")}>Bad</button>
        </>
    );
};

export default Options;