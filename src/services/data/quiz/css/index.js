export const CSS_QUIZ_LIST = {
  title: "CSS",
  id: 2,
  img: "",
  questionslet: [
    {
      question: "What does CSS stand for?",
      answers: [
        { ans: "Computer Style Sheets", id: 1 },
        { ans: "Colorful Style Sheets", id: 2 },
        { ans: "Cascading Style Sheets", id: 3 },
        { ans: "Creative Style Sheets", id: 4 },
      ],
      correct: 3,
      selAns: null,
    },
    {
      question:
        "What is the correct HTML for referring to an external style sheet?",
      answers: [
        { ans: "<style src='mystyle.css'>", id: 1 },
        {
          ans: "<link rel='stylesheet' type='text/css' href='mystyle.css'>",
          id: 2,
        },
        { ans: "<stylesheet>mystyle.css</stylesheet>", id: 3 },
        { ans: "<css>mystyle.css</css>", id: 4 },
      ],
      correct: 2,
      selAns: null,
    },
    {
      question:
        "Where in an HTML document is the correct place to refer to an external style sheet?",
      answers: [
        { ans: "In the <body> section", id: 1 },
        { ans: "In the <head> section", id: 2 },
        { ans: "At the end of the document", id: 3 },
        { ans: "In the <footer> section", id: 4 },
      ],
      correct: 2,
      selAns: null,
    },
    {
      question: "Which HTML tag is used to define an internal style sheet?",
      answers: [
        { ans: "<css>", id: 1 },
        { ans: "<style>", id: 2 },
        { ans: "<script>", id: 3 },
        { ans: "<link>", id: 4 },
      ],
      correct: 2,
      selAns: null,
    },
    {
      question: "Which HTML attribute is used to define inline styles?",
      answers: [
        { ans: "class", id: 1 },
        { ans: "style", id: 2 },
        { ans: "font", id: 3 },
        { ans: "styles", id: 4 },
      ],
      correct: 2,
      selAns: null,
    },
    {
      question: "Which is the correct CSS syntax?",
      answers: [
        { ans: "body {color: black;}", id: 1 },
        { ans: "{body:color=black;}", id: 2 },
        { ans: "body:color=black;", id: 3 },
        { ans: "{body;color:black;}", id: 4 },
      ],
      correct: 1,
      selAns: null,
    },
    {
      question: "How do you insert a comment in a CSS file?",
      answers: [
        { ans: "// this is a comment //", id: 1 },
        { ans: "/* this is a comment */", id: 2 },
        { ans: "' this is a comment", id: 3 },
        { ans: "<!-- this is a comment -->", id: 4 },
      ],
      correct: 2,
      selAns: null,
    },
    {
      question: "Which property is used to change the background color?",
      answers: [
        { ans: "color", id: 1 },
        { ans: "bgcolor", id: 2 },
        { ans: "background-color", id: 3 },
        { ans: "bg-color", id: 4 },
      ],
      correct: 3,
      selAns: null,
    },
    {
      question: "How do you add a background color for all <h1> elements?",
      answers: [
        { ans: "h1 {background-color:#FFFFFF;}", id: 1 },
        { ans: "h1.all {background-color:#FFFFFF;}", id: 2 },
        { ans: "all.h1 {background-color:#FFFFFF;}", id: 3 },
        { ans: "h1 {bgcolor:#FFFFFF;}", id: 4 },
      ],
      correct: 1,
      selAns: null,
    },
    {
      question:
        "Which CSS property is used to change the text color of an element?",
      answers: [
        { ans: "text-color", id: 1 },
        { ans: "font-color", id: 2 },
        { ans: "color", id: 3 },
        { ans: "text-style", id: 4 },
      ],
      correct: 3,
      selAns: null,
    },
    {
      question: "Which CSS property controls the text size?",
      answers: [
        { ans: "font-style", id: 1 },
        { ans: "text-size", id: 2 },
        { ans: "font-size", id: 3 },
        { ans: "text-style", id: 4 },
      ],
      correct: 3,
      selAns: null,
    },
    {
      question:
        "What is the correct CSS syntax for making all the <p> elements bold?",
      answers: [
        { ans: "p {font-weight:bold;}", id: 1 },
        { ans: "p {text-size:bold;}", id: 2 },
        { ans: "p {font:bold;}", id: 3 },
        { ans: "p {style:bold;}", id: 4 },
      ],
      correct: 1,
      selAns: null,
    },
    {
      question: "How do you display hyperlinks without an underline?",
      answers: [
        { ans: "a {text-decoration:no-underline;}", id: 1 },
        { ans: "a {underline:none;}", id: 2 },
        { ans: "a {decoration:no-underline;}", id: 3 },
        { ans: "a {text-decoration:none;}", id: 4 },
      ],
      correct: 4,
      selAns: null,
    },
    {
      question:
        "How do you make each word in a text start with a capital letter?",
      answers: [
        { ans: "text-transform:capitalize", id: 1 },
        { ans: "text-transform:uppercase", id: 2 },
        { ans: "text-style:capitalize", id: 3 },
        { ans: "font-transform:capitalize", id: 4 },
      ],
      correct: 1,
      selAns: null,
    },
    {
      question: "Which property is used to change the font of an element?",
      answers: [
        { ans: "font-family", id: 1 },
        { ans: "font-style", id: 2 },
        { ans: "font-weight", id: 3 },
        { ans: "font-type", id: 4 },
      ],
      correct: 1,
      selAns: null,
    },
    {
      question: "How do you make the text bold?",
      answers: [
        { ans: "font-weight:bold;", id: 1 },
        { ans: "style:bold;", id: 2 },
        { ans: "font:bold;", id: 3 },
        { ans: "text-style:bold;", id: 4 },
      ],
      correct: 1,
      selAns: null,
    },
    {
      question:
        "How do you display a border like this: The top border = 10 pixels, The bottom border = 5 pixels, The left border = 20 pixels, The right border = 1pixel?",
      answers: [
        { ans: "border-width:10px 1px 5px 20px;", id: 1 },
        { ans: "border-width:10px 20px 5px 1px;", id: 2 },
        { ans: "border-width:10px 5px 20px 1px;", id: 3 },
        { ans: "border-width:10px 20px 1px 5px;", id: 4 },
      ],
      correct: 1,
      selAns: null,
    },
    {
      question:
        "Which property is used to change the left margin of an element?",
      answers: [
        { ans: "margin-left", id: 1 },
        { ans: "padding-left", id: 2 },
        { ans: "indent", id: 3 },
        { ans: "left-margin", id: 4 },
      ],
      correct: 1,
      selAns: null,
    },
    {
      question:
        "When using the padding property; are you allowed to use negative values?",
      answers: [
        { ans: "Yes", id: 1 },
        { ans: "No", id: 2 },
      ],
      correct: 2,
      selAns: null,
    },
    {
      question: "How do you make a list that lists its items with squares?",
      answers: [
        { ans: "list-style-type:square;", id: 1 },
        { ans: "list-type:square;", id: 2 },
        { ans: "list-style:square;", id: 3 },
        { ans: "list:square;", id: 4 },
      ],
      correct: 1,
      selAns: null,
    },
    {
      question: "How do you select an element with id 'demo'?",
      answers: [
        { ans: ".demo", id: 1 },
        { ans: "#demo", id: 2 },
        { ans: "*demo", id: 3 },
        { ans: "demo", id: 4 },
      ],
      correct: 2,
      selAns: null,
    },
    {
      question: "How do you select elements with class name 'test'?",
      answers: [
        { ans: "#test", id: 1 },
        { ans: ".test", id: 2 },
        { ans: "*test", id: 3 },
        { ans: "test", id: 4 },
      ],
      correct: 2,
      selAns: null,
    },
    {
      question: "How do you select all p elements inside a div element?",
      answers: [
        { ans: "div.p", id: 1 },
        { ans: "div + p", id: 2 },
        { ans: "div p", id: 3 },
        { ans: "div > p", id: 4 },
      ],
      correct: 3,
      selAns: null,
    },
    {
      question: "How do you group selectors?",
      answers: [
        { ans: "Separate each selector with a comma", id: 1 },
        { ans: "Separate each selector with a plus sign", id: 2 },
        { ans: "Separate each selector with a space", id: 3 },
        { ans: "Separate each selector with a semicolon", id: 4 },
      ],
      correct: 1,
      selAns: null,
    },
    {
      question: "What is the default value of the position property?",
      answers: [
        { ans: "static", id: 1 },
        { ans: "relative", id: 2 },
        { ans: "fixed", id: 3 },
        { ans: "absolute", id: 4 },
      ],
      correct: 1,
      selAns: null,
    },
  ],
};
