import React, { useState } from "react";

function Main() {
  const [searchText, setsearchText] = useState("");
  const [searchlist, setsearchlist] = useState([]);
  const [text, settext] = useState("");
  const [hideCheched, setHideCheched] = useState(false);
  const [todoList, settodoList] = useState([]);
  // const [check, setcheck] = useState([]);

  const hideComplete = (evt) => {
    let cheked = document.getElementsByClassName("checkbox");
    if (evt.target.checked) {
      for (const item of cheked) {
        if (item.checked) {
          item.parentElement.parentElement.style.visibility = "hidden";
          item.parentElement.parentElement.style.position = "absolute";
        }
      }
    } else {
      for (const item of cheked) {
        if (item.checked) {
          item.parentElement.parentElement.style.visibility = "visible";
          item.parentElement.parentElement.style.position = "relative";
        }
      }
    }
  };
  const handleChange = (evt, li, ind) => {
    // todoList
  };
  const ADD = (ind) => {
    let list = [...todoList, { text, ischecked: false }];
    settodoList(list);
    settext("");
  };
  const Search = (val) => {
    if (val !== "") {
      let list = todoList.filter((t) => {
        if (t.text.includes(val)) {
          return t;
        }
      });
      setsearchlist(list);
      console.log(searchlist);
    } else {
    }
  };
  const Remove = (ind) => {
    let list = todoList.filter((todo, index) => {
      return index !== ind;
    });
    settodoList(list);
  };
  return (
    <div className="main">
      <div className="form-control">
        <input
          value={searchText}
          type="text"
          placeholder="Search"
          className="input-field"
          onChange={(evt) => {
            setsearchText(evt.target.value);
            Search(evt.target.value);
          }}
        />
        <span>
          <input
            type="checkbox"
            className="checkbox1"
            onChange={(evt) => {
              setHideCheched(!hideCheched);

              hideComplete(evt);
            }}
            checked={hideCheched}
          />{" "}
          Hide Compelete
        </span>
      </div>
      <div className="content">
        <div className="outerBox">
          {searchText !== "" ? (
            <>
              {searchlist.length ? (
                searchlist.map((li, ind) => {
                  return (
                    <div key={ind} className="box">
                      <span>{li.text}</span>
                    </div>
                  );
                })
              ) : (
                <h1>Nothing found</h1>
              )}
            </>
          ) : (
            <>
              <div id="element">
                <h1>You have {todoList ? todoList.length : 0} todos Left</h1>
                {todoList.map((item, ind) => {
                  return (
                    <div key={ind} className="box">
                      <span>
                        <input
                          id={"id" + ind}
                          type="checkbox"
                          checked={item.ischecked}
                          className="checkbox"
                          onChange={(evt) => {
                            let newArr = [...todoList];
                            newArr[ind].ischecked = !evt.target.checked;
                            settodoList(newArr);
                            let chck = (newArr[ind].ischecked = !newArr[ind]
                              .ischecked);
                            // handleChange(evt, item, ind);
                          }}
                        />
                        {""} {item.text}
                      </span>
                      <span
                        onClick={() => {
                          Remove(ind);
                        }}
                      >
                        remove
                      </span>
                    </div>
                  );
                })}
                <div className="form-control">
                  <input
                    type="text"
                    value={text}
                    className="input-field"
                    onChange={(evt) => {
                      settext(evt.target.value);
                    }}
                  />
                  <button
                    className="btn"
                    onClick={() => {
                      ADD();
                    }}
                  >
                    Sumbit
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Main;
