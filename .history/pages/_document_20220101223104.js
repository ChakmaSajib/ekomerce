// We will change the way that Next basically render the pages
import Document, { Html } from 'next/document';
export default class MyDocument extends Document {
    render() {
        return (
            <Html ></Html>
        )
    }
}