import { Component } from "react/cjs/react.development";
import ErrorIndicator from "../errorIndicator/errorIndicator";

class ErrorBoundry extends Component {

    state = {
        error: false
    }

    componentDidCatch(error, errorInfo) {
        console.log(error, errorInfo);
        this.setState({
            error: true
        })
    }

    

    render() {

        if(this.state.error) {
            return <ErrorIndicator/>
        }

        return this.props.children
    }
}

export default ErrorBoundry;