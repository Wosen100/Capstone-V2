import React from 'react';
import styled from 'styled-components';

const ErrorP = styled.p`
  color: rgb(255, 33, 33);
  padding: 0;
  font-weight: bold;
`;

interface ErrorMessageType {
  message: string;
  path: string;
}

interface ErrorMessageDisplayType {
  errorMessages: Array<ErrorMessageType>;
  path: string;
}

export default function ErrorMessageDisplay({
  errorMessages,
  path,
}: ErrorMessageDisplayType) {
  return (
    <div>
      {errorMessages.map((val: ErrorMessageType) => (
        <ErrorP key={val.path}>
          {val.path === path ? val.message : ''}
        </ErrorP>
      ))}
    </div>
  );
}
