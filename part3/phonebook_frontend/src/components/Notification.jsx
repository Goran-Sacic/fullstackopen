import "./Notification.css";

const Notification = ({ message, error }) => {
  if (message === "This is some message.") {
    return <div>{message}</div>;
  } else if (message === null) {
    return;
  } else {
    const isError = error ? "errorTrue" : "errorFalse";

    return <div className={isError}>{message}</div>;
  }
};

export default Notification;
