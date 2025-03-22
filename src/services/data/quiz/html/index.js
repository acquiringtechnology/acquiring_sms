export const HTML_QUIZ_LIST = {
  title: "HTML",
  id: 1,
  img: "",
  questions: [
    {
      question: "What does HTML stand for?",
      answers: [
        { ans: "HyperText Markup Language", id: 1 },
        { ans: "High-Level Text Management Language", id: 2 },
        { ans: "Hyper Transfer Markup Language", id: 3 },
        { ans: "Home Tool Markup Language", id: 4 },
      ],
      correct: 1,
      selAns: null,
    },
    {
      question: "Who is making the Web standards?",
      answers: [
        { ans: "Microsoft", id: 1 },
        { ans: "Google", id: 2 },
        { ans: "Mozilla", id: 3 },
        { ans: "The World Wide Web Consortium (W3C)", id: 4 },
      ],
      correct: 4,
      selAns: null,
    },
    {
      question: "Choose the correct HTML element for the largest heading:",
      answers: [
        { ans: "<h1>", id: 1 },
        { ans: "<heading>", id: 2 },
        { ans: "<h6>", id: 3 },
        { ans: "<head>", id: 4 },
      ],
      correct: 1,
      selAns: null,
    },
    {
      question: "What is the correct HTML element for inserting a line break?",
      answers: [
        { ans: "<lb>", id: 1 },
        { ans: "<break>", id: 2 },
        { ans: "<br>", id: 3 },
        { ans: "<line>", id: 4 },
      ],
      correct: 3,
      selAns: null,
    },
    {
      question: "What is the correct HTML for adding a background color?",
      answers: [
        { ans: "<body bgcolor='yellow'>", id: 1 },
        { ans: "<background>yellow</background>", id: 2 },
        { ans: "<body style='background-color:yellow;'>", id: 3 },
        { ans: "<background color='yellow'>", id: 4 },
      ],
      correct: 3,
      selAns: null,
    },
    {
      question: "Choose the correct HTML element to define important text",
      answers: [
        { ans: "<strong>", id: 1 },
        { ans: "<i>", id: 2 },
        { ans: "<important>", id: 3 },
        { ans: "<b>", id: 4 },
      ],
      correct: 1,
      selAns: null,
    },
    {
      question: "Choose the correct HTML element to define emphasized text",
      answers: [
        { ans: "<em>", id: 1 },
        { ans: "<italic>", id: 2 },
        { ans: "<i>", id: 3 },
        { ans: "<strong>", id: 4 },
      ],
      correct: 1,
      selAns: null,
    },
    {
      question: "What is the correct HTML for creating a hyperlink?",
      answers: [
        { ans: "<a href='http://example.com'>Example</a>", id: 1 },
        { ans: "<a url='http://example.com'>Example</a>", id: 2 },
        { ans: "<link href='http://example.com'>Example</link>", id: 3 },
        { ans: "<a name='http://example.com'>Example</a>", id: 4 },
      ],
      correct: 1,
      selAns: null,
    },
    {
      question: "Which character is used to indicate an end tag?",
      answers: [
        { ans: "<", id: 1 },
        { ans: ">", id: 2 },
        { ans: "/", id: 3 },
        { ans: "*", id: 4 },
      ],
      correct: 3,
      selAns: null,
    },
    {
      question: "How can you open a link in a new tab/browser window?",
      answers: [
        {
          ans: "<a href='http://example.com' target='_blank'>Example</a>",
          id: 1,
        },
        { ans: "<a href='http://example.com' new>Example</a>", id: 2 },
        {
          ans: "<a href='http://example.com' target='_new'>Example</a>",
          id: 3,
        },
        { ans: "<a href='http://example.com' target='new'>Example</a>", id: 4 },
      ],
      correct: 1,
      selAns: null,
    },
    {
      question: "Which of these elements are all <table> elements?",
      answers: [
        { ans: "<table><tr><td>", id: 1 },
        { ans: "<table><head><tfoot>", id: 2 },
        { ans: "<table><tr><tt>", id: 3 },
        { ans: "<thead><body><tr>", id: 4 },
      ],
      correct: 1,
      selAns: null,
    },
    {
      question:
        "Inline elements are normally displayed without starting a new line.",
      answers: [
        { ans: "True", id: 1 },
        { ans: "False", id: 2 },
      ],
      correct: 1,
      selAns: null,
    },
    {
      question: "How can you make a numbered list?",
      answers: [
        { ans: "<ol>", id: 1 },
        { ans: "<ul>", id: 2 },
        { ans: "<list>", id: 3 },
        { ans: "<dl>", id: 4 },
      ],
      correct: 1,
      selAns: null,
    },
    {
      question: "How can you make a bulleted list?",
      answers: [
        { ans: "<ul>", id: 1 },
        { ans: "<ol>", id: 2 },
        { ans: "<list>", id: 3 },
        { ans: "<dl>", id: 4 },
      ],
      correct: 1,
      selAns: null,
    },
    {
      question: "What is the correct HTML for making a checkbox?",
      answers: [
        { ans: "<input type='check'>", id: 1 },
        { ans: "<check>", id: 2 },
        { ans: "<input type='checkbox'>", id: 3 },
        { ans: "<checkbox>", id: 4 },
      ],
      correct: 3,
      selAns: null,
    },
    {
      question: "What is the correct HTML for making a text input field?",
      answers: [
        { ans: "<input type='text'>", id: 1 },
        { ans: "<textfield>", id: 2 },
        { ans: "<textinput>", id: 3 },
        { ans: "<input type='textfield'>", id: 4 },
      ],
      correct: 1,
      selAns: null,
    },
    {
      question: "What is the correct HTML for making a drop-down list?",
      answers: [
        { ans: "<input type='dropdown'>", id: 1 },
        { ans: "<select>", id: 2 },
        { ans: "<list>", id: 3 },
        { ans: "<input type='list'>", id: 4 },
      ],
      correct: 2,
      selAns: null,
    },
    {
      question: "What is the correct HTML for making a text area?",
      answers: [
        { ans: "<input type='textarea'>", id: 1 },
        { ans: "<textarea>", id: 2 },
        { ans: "<text>", id: 3 },
        { ans: "<input type='text'>", id: 4 },
      ],
      correct: 2,
      selAns: null,
    },
    {
      question: "What is the correct HTML for inserting an image?",
      answers: [
        { ans: "<img href='image.png'>", id: 1 },
        { ans: "<img src='image.png'>", id: 2 },
        { ans: "<image src='image.png'>", id: 3 },
        { ans: "<img url='image.png'>", id: 4 },
      ],
      correct: 2,
      selAns: null,
    },
    {
      question: "What is the correct HTML for inserting a background image?",
      answers: [
        { ans: "<body background='image.png'>", id: 1 },
        { ans: "<background img='image.png'>", id: 2 },
        { ans: "<img src='image.png' background>", id: 3 },
        { ans: "<body style='background-image:url(image.png)'>", id: 4 },
      ],
      correct: 4,
      selAns: null,
    },
    {
      question: "An <iframe> is used to display a web page within a web page.",
      answers: [
        { ans: "True", id: 1 },
        { ans: "False", id: 2 },
      ],
      correct: 1,
      selAns: null,
    },
    {
      question: "HTML comments start with <!-- and end with -->",
      answers: [
        { ans: "True", id: 1 },
        { ans: "False", id: 2 },
      ],
      correct: 1,
      selAns: null,
    },
    {
      question:
        "Block elements are normally displayed without starting a new line.",
      answers: [
        { ans: "True", id: 1 },
        { ans: "False", id: 2 },
      ],
      correct: 2,
      selAns: null,
    },
    {
      question: "Which HTML element defines the title of a document?",
      answers: [
        { ans: "<head>", id: 1 },
        { ans: "<meta>", id: 2 },
        { ans: "<title>", id: 3 },
        { ans: "<header>", id: 4 },
      ],
      correct: 3,
      selAns: null,
    },
    {
      question:
        "Which HTML attribute specifies an alternate text for an image, if the image cannot be displayed?",
      answers: [
        { ans: "src", id: 1 },
        { ans: "alt", id: 2 },
        { ans: "title", id: 3 },
        { ans: "longdesc", id: 4 },
      ],
      correct: 2,
      selAns: null,
    },
    {
      question: "Which doctype is correct for HTML5?",
      answers: [
        { ans: "<!DOCTYPE html>", id: 1 },
        { ans: "<!DOCTYPE HTML5>", id: 2 },
        {
          ans: "<!DOCTYPE HTML PUBLIC '-//W3C//DTD HTML 5.0//EN' 'http://www.w3.org/TR/html5/strict.dtd'>",
          id: 3,
        },
        {
          ans: "<!DOCTYPE HTML PUBLIC '-//W3C//DTD HTML 4.01//EN' 'http://www.w3.org/TR/html4/strict.dtd'>",
          id: 4,
        },
      ],
      correct: 1,
      selAns: null,
    },
    {
      question:
        "Which HTML element is used to specify a footer for a document or section?",
      answers: [
        { ans: "<footer>", id: 1 },
        { ans: "<bottom>", id: 2 },
        { ans: "<section>", id: 3 },
        { ans: "<div>", id: 4 },
      ],
      correct: 1,
      selAns: null,
    },
    {
      question:
        "In HTML, you can embed SVG elements directly into an HTML page.",
      answers: [
        { ans: "True", id: 1 },
        { ans: "False", id: 2 },
      ],
      correct: 1,
      selAns: null,
    },
    {
      question: "What is the correct HTML element for playing video files?",
      answers: [
        { ans: "<video>", id: 1 },
        { ans: "<media>", id: 2 },
        { ans: "<movie>", id: 3 },
        { ans: "<embed>", id: 4 },
      ],
      correct: 1,
      selAns: null,
    },
    {
      question: "What is the correct HTML element for playing audio files?",
      answers: [
        { ans: "<audio>", id: 1 },
        { ans: "<sound>", id: 2 },
        { ans: "<mp3>", id: 3 },
        { ans: "<embed>", id: 4 },
      ],
      correct: 1,
      selAns: null,
    },
    {
      question: "The HTML global attribute, 'contenteditable' is used to:",
      answers: [
        {
          ans: "Specify whether the content of an element should be editable or not",
          id: 1,
        },
        { ans: "Specify a context menu for an element", id: 2 },
        {
          ans: "Specify whether the element should be rendered as a block or inline",
          id: 3,
        },
        { ans: "Specify whether the element should be visible or not", id: 4 },
      ],
      correct: 1,
      selAns: null,
    },
    {
      question: "In HTML, onblur and onfocus are:",
      answers: [
        { ans: "HTML elements", id: 1 },
        { ans: "Event attributes", id: 2 },
        { ans: "CSS properties", id: 3 },
        { ans: "JavaScript functions", id: 4 },
      ],
      correct: 2,
      selAns: null,
    },
    {
      question:
        "In HTML, which attribute is used to specify that an input field must be filled out?",
      answers: [
        { ans: "required", id: 1 },
        { ans: "validate", id: 2 },
        { ans: "placeholder", id: 3 },
        { ans: "necessary", id: 4 },
      ],
      correct: 1,
      selAns: null,
    },
  ],
};
