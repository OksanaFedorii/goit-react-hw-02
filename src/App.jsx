import { useState,  useEffect} from "react";
import Options from "./components/Options/Options";
import Feedback from "./components/Feedback/Feedback";
import Notification from "./components/Notification/Notification";
import "./App.css";

const App = () => {
    const [feedback, setFeedback] = useState({ good: 0, neutral: 0, bad: 0 });


    useEffect(() => {
        const storedFeedback = localStorage.getItem("feedback");
        if (storedFeedback) {
            setFeedback(JSON.parse(storedFeedback));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("feedback", JSON.stringify(feedback));
    }, [feedback]);

    const updateFeedback = (type) => {
        setFeedback((prevFeedback) => ({
            ...prevFeedback,
            [type]: prevFeedback[type] + 1
        }));
    };

    const resetFeedback = () => {
        const resetData = { good: 0, neutral: 0, bad: 0 };
        setFeedback(resetData);
        localStorage.setItem("feedback", JSON.stringify(resetData));
    };

    const totalFeedback = feedback.good + feedback.neutral + feedback.bad;
    const positiveFeedback = totalFeedback > 0 ? Math.round((feedback.good / totalFeedback) * 100) : 0;

    return (
        <div>
            <h1>Sip Happens Café</h1>
            <p>Please leave your feedback about our service by selecting one of the options below.</p>
            <Options onUpdateFeedback={updateFeedback} />
            {totalFeedback > 0 ? (
                <>
                    <Feedback
                        feedback={feedback}
                        totalFeedback={totalFeedback}
                        positiveFeedback={positiveFeedback}
                    />
                    <button onClick={resetFeedback}>Reset</button>
                </>
            ) : (
                <Notification message="No feedback given yet" />
            )}
        </div>
    );
};

export default App;