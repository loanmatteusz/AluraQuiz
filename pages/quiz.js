import styled from 'styled-components';

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

function QuestionWidget({ question, questionIndex, totalQuestions }) {
  const questionId = `question__${questionIndex}`;
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
        <form>
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
                />
                {alternative}
              </Widget.Topic>
            );
          })}
        </form>
        {/* <pre>
          {JSON.stringify(question, null, 4)}
        </pre> */}
        <Button>
          Confirmar
        </Button>
      </Widget.Content>
    </Widget>
  );
}

export default function QuizPage() {
  const questionIndex = 0;
  const question = db.questions[questionIndex];
  const totalQuestions = question.alternatives.length;
  return (
    <>
      <QuizBackground backgroundImage={db.bg}>
        <QuizContainer>

          <QuizLogo />

          <QuestionWidget
            question={question}
            questionIndex={questionIndex}
            totalQuestions={totalQuestions}
          />

          <LoadingWidget />

        </QuizContainer>
      </QuizBackground>
      <GitHubCorner projectUrl="https://github.com/loanmatteusz/AluraQuiz" />
    </>
  );
}
