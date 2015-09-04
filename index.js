var React = require("react");
var ReactBootstrap = require("react-bootstrap");
var CodeMirror = require("react-codemirror");
require("react-codemirror/node_modules/codemirror/mode/javascript/javascript");
var Turtle = require("./turtle");
var lindenmayerCtor = require("./lindenmayer");

var Pagination = ReactBootstrap.Pagination;
var Grid = ReactBootstrap.Grid;
var Row = ReactBootstrap.Row;
var Col = ReactBootstrap.Col;
var Button = ReactBootstrap.Button;

var Nav = React.createClass({
    render: function() {
        var current = this.props.current;
        var num = this.props.num;
        var onSelect = this.props.onSelect;
        return <Pagination bsSize="large" items={num} activePage={current} onSelect={onSelect} prev next />;
    }
});

var Slide = React.createClass({
    getInitialState: function() {
        return {
            code: this.props.description.turtle || ""
        };
    },
    componentDidMount: function() {
        var canvas = React.findDOMNode(this.refs.canvas);
        if (canvas) {
            this.turtle = new Turtle(canvas);
            window.turtle = this.turtle;
            window.lindenmayer = lindenmayerCtor(this.turtle);
            this.animate();
        }
    },
    componentWillUnmount: function() {
        this.turtle = null;
    },
    animate: function() {
        if (!this.turtle) {
            return;
        }
        this.turtle.update();
        this.turtle.draw();
        requestAnimationFrame(this.animate);
    },
    run: function() {
        eval(this.state.code);
    },
    reset: function() {
        if (this.turtle) {
            this.turtle.stop();
            this.turtle.clearscreen();
        }
    },
    updateCode: function(newCode) {
        this.setState({
            code: newCode
        });
    },
    render: function() {
        var d = this.props.description;

        var headline;
        if (d.headline) {
            headline = <h1 className="text-center">{d.headline}</h1>;
        }

        var image;
        if (d.image) {
            image = <img className="center-block" src={d.image} />;
        }

        var bullets;
        if (d.bullets) {
            var items = d.bullets.map(function(bullet) {
                return <Row><Col xs={12}><h2>- {bullet}</h2></Col></Row>;
            });
            bullets = (
                    <Grid>
                    {items}
                    </Grid>
            );
        }

        var turtle;
        if (d.turtle) {
            var options = {
                lineNumbers: true,
                mode: "javascript",
                autofocus: true,
                indentUnit: 4
            };
            var editor = <CodeMirror value={this.state.code} options={options} onChange={this.updateCode} />;

            var canvas = (
                    <div className="canvas-wrap">
                    <canvas ref="canvas" width={800} height={600} />
                    </div>
            );

            var run = <Button bsStyle="primary" onClick={this.run}>Run</Button>;
            var reset = <Button bsStyle="danger" onClick={this.reset}>Reset</Button>;

            turtle = (
                    <div className="clearfix">
                    {canvas}
                    {run}
                    {reset}
                    {editor}
                    </div>
            );
        }

        return (
                <div>
                {headline}
                {image}
                {bullets}
                {turtle}
                </div>
        )
    }
});

var App = React.createClass({
    getInitialState: function() {
        return {
            slideNumber: 1
        };
    },
    gotoSlide: function(event, selectedEvent) {
        this.setState({
            slideNumber: selectedEvent.eventKey
        });
    },
    render: function() {
        var slideNumber = this.state.slideNumber;
        var numSlides = this.props.slides.length;
        var nav = <Nav current={slideNumber} num={numSlides} onSelect={this.gotoSlide} />;

        var slide = <Slide key={slideNumber} description={this.props.slides[slideNumber - 1]} />;

        return (
                <div>
                <Grid>
                <Row><Col xs={12}>{nav}</Col></Row>
                </Grid>
                {slide}
                </div>
        );
    }
});

React.render(<App slides={require("./slides")} />, document.body);
