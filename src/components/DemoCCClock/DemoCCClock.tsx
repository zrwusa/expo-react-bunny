import React, {Component} from "react";
import {View} from "react-native";
import {TOButton,Text} from "../styled-bunny-ui";

type Props = { title: string, }
type States = { time: Date, intervalID: ReturnType<typeof setInterval> }

class DemoCCClock extends Component<Props, States> {
    constructor(props: Props) {
        super(props);
        this.state = {
            time: new Date(),
            intervalID: setInterval((): void => undefined, 0)
        };
        this.go = this.go.bind(this);
        this.stop = this.stop.bind(this);
    }

    tick(): void {
        this.setState({
            time: new Date()
        });
    }

    go(): void {
        const intervalID: ReturnType<typeof setInterval> = setInterval(() => this.tick(), 1000);
        this.setState({intervalID: intervalID});
    }

    stop() {
        clearInterval(this.state.intervalID);
    }

    componentDidMount() {
        this.tick();
        this.go();
    }

    render(): React.ReactNode {
        return (<View>
            <Text>{this.props.title}</Text>
            <Text>The current time is {this.state.time.toLocaleTimeString()}</Text>
            <TOButton onPress={this.stop}><Text>Stop</Text></TOButton>
            <TOButton onPress={this.go}><Text>Go</Text></TOButton>
        </View>);
    }

    componentWillUnmount() {
        this.stop();
    }
}

export default DemoCCClock;
