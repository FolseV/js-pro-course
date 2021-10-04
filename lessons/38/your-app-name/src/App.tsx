import React from "react";
import "./App.css";
import EmojiContainer from "./components/EmojiContainer";
import SearchInput from "./components/SearchInput";
import SearchNumber from "./components/SearchNumber";

interface Props {}
interface State {
  searchValue: string;
  resultNumber: number;
}

class App extends React.Component {
  state: State;

  constructor(props: Props) {
    super(props);

    this.state = {
      searchValue: "",
      resultNumber: 100,
    };
  }

  valueChangeHandler = (newValue: string): void => {
    this.setState({ searchValue: newValue });
  };

  render() {
    return (
      <>
        <div className="search">
          <SearchNumber
            searchNumber={this.state.resultNumber}
            numberRes={(newNumber) =>
              this.setState({ resultNumber: newNumber })
            }
          />
          <SearchInput
            searchValue={this.state.searchValue}
            // searchValueChange={this.valueChangeHandler}
            searchValueChange={(newValue) =>
              this.setState({ searchValue: newValue })
            }
          />
        </div>

        <EmojiContainer
          searchValue={this.state.searchValue}
          resultNumber={this.state.resultNumber}
        />
      </>
    );
  }
}

export default App;