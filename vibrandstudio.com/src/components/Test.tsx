type TestProps = {
    text: string;
};

function Test({ text }: TestProps) {
    return <div>{text}</div>;
}

export default Test;