var React = require("react");
var ReactBootstrap = require("react-bootstrap");
var superagent = require("superagent");
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

var Bullets = React.createClass({
    render: function() {
        var items = this.props.items.map(function(item) {
            return <Row key={item}><Col xs={12}><h2>- {item}</h2></Col></Row>;
        });
        return <Grid>{items}</Grid>;
    }
});

var Playground = React.createClass({
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
        var startTime = Date.now();
        eval(this.props.code);
        if (this.turtle) {
            this.turtle.call(function() {
                var endTime = Date.now();
                console.log("Run took %s ms", endTime - startTime);
            });
        }
    },
    reset: function() {
        if (this.turtle) {
            this.turtle.stop();
            this.turtle.clearscreen();
        }
    },
    render: function() {
        var options = {
            lineNumbers: true,
            mode: "javascript",
            autofocus: true,
            indentUnit: 4
        };
        var editor = <CodeMirror value={this.props.code} options={options} onChange={this.props.onChange} />;

        var canvas = (
                <div className="canvas-wrap">
                <canvas ref="canvas" width={800} height={600} />
                </div>
        );

        var run = <Button bsStyle="primary" onClick={this.run}>Run</Button>;
        var reset = <Button bsStyle="danger" onClick={this.reset}>Reset</Button>;

        return <div className="clearfix">{canvas}{run}{reset}{editor}</div>;
    }
});

var Slide = React.createClass({
    getInitialState: function() {
        return {
            code: ""
        };
    },
    updateCode: function(newCode) {
        this.setState({code: newCode});
    },
    componentDidMount: function() {
        if (this.props.description.playground) {
            var url = "/snippets/" + this.props.description.playground + ".js";
            superagent.get(url)
                .end(function(err, res) {
                    if (err) {
                        console.log("Snippet GET error:", err);
                        return;
                    }
                    this.setState({code: res.text});
                }.bind(this));
        }
    },
    render: function() {
        var d = this.props.description;
        var headline = d.headline && <h1 className="text-center">{d.headline}</h1>;
        var image = d.image && <img className="center-block" src={d.image} />;
        var bullets = d.bullets && <Bullets items={d.bullets} />;
        var playground = d.playground && <Playground code={this.state.code} onChange={this.updateCode} />;
        return <div>{headline}{image}{bullets}{playground}</div>;
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
                <Grid><Row><Col xs={12}>{nav}</Col></Row></Grid>
                {slide}
                </div>
        );
    }
});

React.render(<App slides={require("./slides")} />, document.body);
