module.exports = class {
  #specials;
  #otherSpecials;
  #allSpecials;
  constructor(otherSpecials = {}) {
    this.#specials = {
      flipcard: {
        conversion: "div",
        class: "flipcard",
        children: {
          front: {
            conversion: "div",
            class: "front",
          },
          back: {
            conversion: "div",
            class: "back",
          },
        },
      },
      button: {
        conversion: "button",
        class: "button",
      },
      slider: {
        conversion: "div",
        class: "slider",
      },
      embed: {
        conversion: "div",
        class: "embed",
      },
      slider: {
        conversion: "div",
        class: "slider",
      },
      div: {
        conversion: "div",
        class: "div",
      },
      column: {
        conversion: "div",
        class: "column",
        children: {
          col1: {
            conversion: "div",
            class: "col-1",
          },
          col2: {
            conversion: "div",
            class: "col-2",
          },
          col3: {
            conversion: "div",
            class: "col-3",
          },
          col4: {
            conversion: "div",
            class: "col-4",
          },
        },
      },
    };
    this.#otherSpecials = otherSpecials;
    this.#allSpecials = { ...this.#specials, ...this.#otherSpecials };
  }

  reparse(input) {
    let reg = /\>(\s\w.*?)\</gs;
    let matches;
    while ((matches = reg.exec(input)) !== null) {
      console.log(matches[1]);
      input = input.replace(matches[1], () => {
        return "<p>" + matches[1] + "</p>";
      });
    }
    return input;
  }

  buildRegex(specials) {
    let reg = "";
    let i = 0;
    for (let key in specials) {
      i++;
      reg += "(?<" + key + ">\\[" + key + "(.*?)\\](.*?)\\[\\/" + key + "\\])";
      if (i < Object.keys(specials).length) {
        reg += "|";
      }
    }
    return new RegExp(reg, "gs");
  }
  parseSpecials(input) {
    return (
      //"<div>" + this.#parseSpecialsRec(input, this.#allSpecials) + "</div>"
      this.#parseSpecialsRec(input, this.#allSpecials)
    );
  }

  /**
   * This is a recursive function that will loop through an input and convert it to HTML
   * @param {String} input
   * @param {Object} specials
   */
  #parseSpecialsRec(input, specials) {
    let reg = this.buildRegex(specials);
    let matches;
    while ((matches = reg.exec(input)) !== null) {
      let i = 0;
      for (const [key, value] of Object.entries(matches.groups)) {
        i++;
        if (value !== undefined) {
          input = input.replace(value, () => {
            let style = "";
            let innerText = matches[i * 3];
            if (specials[key].children !== undefined) {
              innerText = this.#parseSpecialsRec(
                innerText,
                specials[key].children
              );
            }
            if (matches[i * 3 - 1] !== undefined) {
              //this is any inner elements in a special like [slider color: blue] gets "color: blue"
              style = matches[i * 3 - 1];
            }
            return (
              "<" +
              specials[key].conversion +
              ' class="' +
              specials[key].class +
              '"' +
              (style !== "" ? ' style="' + style.trim() + '"' : "") +
              ">" +
              innerText.trim() +
              "</" +
              specials[key].conversion +
              ">"
            );
          });
        }
      }
      reg.lastIndex = matches.index;
    }
    return input;
  }
};
// var input =
//   "Lorem ipsum[front] wadawd [/front]  dolor sit amet,[div] booto [/div] consectetur adipiscing elit, sed [image] gross [/image] do eiusmod tempor incididunt ut" +
//   "labore et dolore magna aliqua. [flipcard] [front color:blue]This [button] wtwawa [/button] is a card [/front] [back color:red] this is back of card [/back] [/flipcard] Praesent tristique magna sit amet purus. [button] This is a button 2 [/button] ";

//let specials1 = new this.Special();
// console.log(specials1.parseSpecials(input));

// //let special = parseSpecialElements();
// //console.log(special);
