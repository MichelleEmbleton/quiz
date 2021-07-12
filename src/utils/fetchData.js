
export const fetchData = async () => {
    try {
        const res = await fetch('quiz.json');
        const data = await res.json();
        return data.questions;
    } catch (error) {
        // set up a replacement view for here ??
        console.log(error, '😡')
    }
}