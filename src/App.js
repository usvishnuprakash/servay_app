import logo from "./logo.svg";
import "./App.css";
import Select from "react-select";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";

function SetSelectedOption({ options, questionTitle, selectOption }) {
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <div className="m-auto">
      <div>
        <h1 className="text-xl font-bold whitespace-pre-line">
          {" "}
          {questionTitle}
        </h1>
      </div>

      <div className="mt-[30px]">
        {options.map((eachOptions) => (
          <div
            className={`border border-gray-200 mt-[18px] px-[10px] py-[5px]`}
            onClick={() => {
              selectOption(eachOptions);
              setSelectedOption(eachOptions);
            }}>
            <span></span>
            {eachOptions}
          </div>
        ))}
      </div>
    </div>
  );
}

function App() {
  const [selectQuestionIdx, setSelectQuestionIdx] = useState(0);
  const [showResultScreen, setShowResultScreen] = useState(false);
  const [score, setScore] = useState(0);
  const [welcomPage, setWelcomePage] = useState(true);
  const questions = [
    {
      question: "Which is the most typical presentation of PCOS___________",
      options: [
        "High androgens & irregular periods (or no period) & polycystic ovaries",
        "High androgens & irregular periods (or no period)",
        "High androgens & polycystic ovaries",
        "Irregular periods (or no period) & polycystic ovaries",
      ],
    },
    {
      question: `PCOS can lead to__________
        1. "Type 2 Diabete",
        2. "More likely to be diagnosed with anxiety/depression",
        3. "The increased risk of developing endometrial cancer",
      `,
      options: ["A&B", "A, B, & C", "All of the above", "None of these"],
    },
    {
      question:
        "For PCOS patient ceutral or viscerd obesity leads to more severe IR. This is due to increase of fatty acids.",
      options: ["YES", "NO"],
    },
    {
      question:
        "Inflammatory factors like TNFA, IL-6 can synthesis androgen aggregate IR.",
      options: ["YES", "NO"],
    },
    {
      question:
        "30%-40% of PCOS patients, inositol failed to significantly improve the metabolic and hormonal parameters",
      options: ["YES", "NO"],
    },
    {
      question:
        "Long term usage of Glucophage can lead to gal toxicity cardiovascular risk, vitB12 deficiency.",
      options: ["YES", "NO"],
    },
    {
      question:
        "Inositol is more beneficial to women who wait to have children to improve ovulatory function.",
      options: ["YES", "NO"],
    },
    {
      question:
        "D- chiro inositol increases the action of insulin and it doesn’t have any action on lipid profile inflammatory mediales of PCOS patients",
      options: ["YES", "NO"],
    },
    {
      question:
        "Sophy is unique from all the berberine formulations as it is berberine phytosome",
      options: ["YES", "NO"],
    },
    {
      question: `Berberine is a poly pharmacological  drug and it has
      1.Insulin Sensitivity
      2.Anti-androgenic Effect
      3.Dyslipidemic
      4.Anti-Inflammatory
      Do you agree with it ?
      `,
      options: ["YES", "NO"],
    },
  ];

  const answersInitialState = [];
  const correctAnswer = [
    "High androgens & irregular periods (or no period) & polycystic ovaries",
    "All of the above",
    "YES",
    "YES",
    "YES",
    "YES",
    "YES",
    "YES",
    "YES",
    "YES",
  ];
  const [answers, setAnswers] = useState(Array(10));

  useEffect(() => {
    if (selectQuestionIdx === 10) {
      console.log("answers", answers);
      let sc = 0;
      correctAnswer.forEach((each, idx) => {
        if (each === answers[idx]) {
          sc += 1;
        }
      });
      setScore(sc);
      setShowResultScreen(true);
    }
  }, [selectQuestionIdx]);

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
    },
    onSubmit: (values) => {
      axios
        .post("https://api.storymetrics.ai/survey", {
          username: values.username,
          email: values.email,
          survey_responses: JSON.stringify(answers),
        })
        .then((response) => {
          console.log("response", response);

          // resting

          setSelectQuestionIdx(0);
          setShowResultScreen(false);
          setScore(0);
          setWelcomePage(true);
          setAnswers(Array(10));
          formik.setFieldValue("username", "");
          formik.setFieldValue("email", "");
          window.location.reload();
        })
        .catch((error) => {
          console.log("api hitting error", error);
          setSelectQuestionIdx(0);
          setShowResultScreen(false);
          setScore(0);
          setWelcomePage(true);
          setAnswers(Array(10));
          formik.setFieldValue("username", "");
          formik.setFieldValue("email", "");
          window.location.reload();
        });
    },
  });
  return (
    <div className="App ">
      <>
        {welcomPage && (
          <div className="w-full h-full flex items-center content-center flex-col">
            <img src="/logo.png" alt="" className="w-[75%] h-max" />

            <button
              onClick={() => {
                setWelcomePage(false);
              }}
              type="button"
              className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
              Take Survey
            </button>
          </div>
        )}
      </>
      <>
        {!welcomPage && (
          <>
            <h1 className="m-auto mt-[200px] text-center">
              Q.{selectQuestionIdx} /10
            </h1>
            <div className="border border-borderColor w-max h-max m-auto mt-[50px] p-[50px] max-w-[90%] ">
              {!showResultScreen && questions[selectQuestionIdx]?.question && (
                <SetSelectedOption
                  questionTitle={questions[selectQuestionIdx]?.question}
                  options={questions[selectQuestionIdx]?.options}
                  selectOption={(selectOption) => {
                    setAnswers((prev) => {
                      prev[selectQuestionIdx] = selectOption;
                      return prev;
                    });
                    setSelectQuestionIdx((perv) => {
                      return perv + 1;
                    });
                  }}
                />
              )}
              {showResultScreen && (
                <>
                  <div>
                    <h1 className="font-extrabold">Thank you submitting</h1>
                    <h1 className="font-semibold  mt-[6px] text-borderColor">
                      You score {score}/10
                    </h1>
                  </div>
                  <div className="w-full max-w-xs">
                    <form
                      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                      onSubmit={formik.handleSubmit}>
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          for="username">
                          Enter Your Name
                        </label>
                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="username"
                          type="text"
                          placeholder="Username"
                          onChange={formik.handleChange}
                          value={formik.values.username}
                        />
                      </div>
                      <div className="mb-6">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          for="Email">
                          Email
                        </label>
                        <input
                          className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                          id="email"
                          type="email"
                          placeholder="example@example.com"
                          onChange={formik.handleChange}
                          value={formik.values.email}
                        />
                        {!!formik.values.email === false && (
                          <p className="text-red-500 text-xs italic">
                            Please Enter Email.
                          </p>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                          type="submit">
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </>
    </div>
  );
}

export default App;
