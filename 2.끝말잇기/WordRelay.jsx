const React = require('react');
const { Component } = React;

class WordRelay extends Component {
  state = {
    word: '제로다', // 첫단어
    value: '',
    result: '',
  };

  onSubmitForm = (e) => {
    e.preventDefault();
    if (this.state.word[this.state.word -1] === this.state.value[0]) {
      this.setState({
        result: '딩동댕',
        word: this.state.value,
        value: ''
      });
      this.input.focus();
    } else {
      this.setState({
        result: '떙',
        value: '',
      });
      this.input.focus();
    }
  };

  onRefInput = (c) => {
    this.input = c;
  };

  onChange = (e) => {
    this.setState({value: e.target.value})
  };

  input;

  render() {
    return (
      <>
        <div>{this.state.word}</div>
        <div>
          <form onSubmit={this.onSubmitForm}>
            <input ref={this.onRefInput}  value={this.state.value} onChange={this.onChange} />
            <button>입력!</button>
          </form>
        </div>
        <div>{this.state.result}</div>
      </>
    );
  }
}

module.exports = WordRelay;
