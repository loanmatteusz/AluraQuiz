import React from 'react';

import db from '../db.json';

import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import QuizLogo from '../src/components/QuizLogo';
import Widget from '../src/components/Widget';
import Button from '../src/components/Button';
import GitHubCorner from '../src/components/GitHubCorner';

function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>
        Carregando...
      </Widget.Header>
      <Widget.Content>
        [Challenge of Loading]
      </Widget.Content>
    </Widget>
  );
}

function ResultWidget({ results }) {
  const successes = results.filter(trueValue => trueValue).length;
  const image = `${db.imgBySuccess[successes]}`;
  return (
    <Widget>
      <Widget.Header>
      <img
        alt="Resultado"
        style={{
          width: '100%',
          height: '200px',
          objectFit: 'cover'
        }}
        src={image}
      />
      </Widget.Header>
      <Widget.Content>
        <p>
          Você acertou {successes} perguntas.
        </p>
        <ul>
          {results.map((result, index) => {
            return <>
            <li>
              {`#0${index+1} Resultado: `}
              {result === true ? 'Acertou' : 'Errou'}
            </li>
          </>
          })}
        </ul>
      </Widget.Content>
    </Widget>
  );
}

function QuestionWidget({
  question,
  questionIndex,
  totalQuestions,
  onSubmit,
  addResult
}) {
  const [selectedAlternative, setSelectedAlternative] = React.useState(undefined);
  const [isQuestionSubmited, setIsQuestionSubmited] = React.useState(false);
  const questionId = `question__${questionIndex}`;
  const isCorrent = selectedAlternative === question.answer;
  const hasAlternativeSelected = selectedAlternative !== undefined;

  return (
    <Widget>
      <Widget.Header>
        {/* <BackLinkArrow href="/" /> */}
        <h3>
          {`Pergunta ${questionIndex + 1} de ${totalQuestions}`}
        </h3>
      </Widget.Header>

      <img
        alt="Descrição"
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover'
        }}
        src={question.image}
      />

      <Widget.Content>
        <h2>
          {question.title}
        </h2>
        <p>
          {question.description}
        </p>
        <form onSubmit={(eventInfos) => {
          eventInfos.preventDefault();
          setIsQuestionSubmited(true);
          setTimeout(() => {
            addResult(isCorrent);
            setIsQuestionSubmited(false);
            onSubmit();
            setSelectedAlternative(undefined);
          }, 1 * 1000);
        }}>
          {question.alternatives.map((alternative, index) => {
            const alternativeId = `alternative__${index}`;
            return (
              <Widget.Topic
                as="label"
                htmlFor={alternativeId}
              >
                <input
                  id={alternativeId}
                  name={questionId}
                  type="radio"
                  onChange={() => setSelectedAlternative(index)}
                  // style={{ display: 'none' }}
                />
                {alternative}
              </Widget.Topic>
            );
          })}
          <Button
            type="submit"
            disabled={!hasAlternativeSelected}
          >
            Confirmar
          </Button>
          {/* <p>selectedAlternative: {`${selectedAlternative}`}</p> */}
          {isQuestionSubmited && isCorrent && <p>Você ACERTOU! UHUUUU!</p>}
          {isQuestionSubmited && !isCorrent && <p>Você errou :c</p>}
        </form>
        {/* <pre>
          {JSON.stringify(question, null, 4)}
        </pre> */}
      </Widget.Content>
    </Widget>
  );
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT'
};


export default function QuizPage() {
  const [screenState, setScreenState] = React.useState(screenStates.QUIZ);
  const [questionIndex, setQuestionIndex] = React.useState(0);
  const question = db.questions[questionIndex];
  const totalQuestions = db.questions.length;
  const [results, setResults] = React.useState([]);
  
  React.useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 0.5 * 1000);
  }, []);

  function addResult(result) {
    setResults([...results, result]);
  }

  function handleSubmit() {
    const nextQuestion = questionIndex + 1;
    if (nextQuestion < totalQuestions) {
      setQuestionIndex(nextQuestion);
    }
    else {
      setScreenState(screenStates.RESULT);
    }
  }

  return (
    <>
      <QuizBackground backgroundImage={db.bg}>
        <QuizContainer>

          <QuizLogo />
          {screenState === screenStates.QUIZ && (
            <QuestionWidget
              question={question}
              questionIndex={questionIndex}
              totalQuestions={totalQuestions}
              onSubmit={handleSubmit}
              addResult={addResult}
            />
          )}
          {screenState === screenStates.LOADING && <LoadingWidget />}
          {screenState === screenStates.RESULT && <ResultWidget results={results} />}

        </QuizContainer>
      </QuizBackground>
      <GitHubCorner projectUrl="https://github.com/loanmatteusz/AluraQuiz" />
    </>
  );
}
