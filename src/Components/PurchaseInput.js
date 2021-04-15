import React, { Component, createRef } from "react";
import styled from "@emotion/styled";

import LottoContext from "../Contexts/LottoContext";
import ErrorMessageBox from "./common/ErrorMessageBox";
import { isDivisible } from "../utils";

const Form = styled.form`
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
`;

const Button = styled.button`
  width: 80px;
  margin-left: 5px;
  padding: 10px 0;
  background-color: #00bcd4;
  border: none;
  border-radius: 5px;
  outline: none;
  cursor: pointer;
  &:hover {
    background-color: #018c9e;
  }
`;

// TODO: 1000 매직 넘버 상수 처리
export default class PurchaseInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isValidInput: true,
    };

    this.formRef = createRef();
    this.onSubmit = this.onSubmit.bind(this);
  }

  // TODO: 매직넘버 상수화
  onSubmit(event) {
    event.preventDefault();

    const payment = Number(event.target.elements["purchase-input"].value);

    this.setState(
      {
        isValidInput: isDivisible(payment, 1000),
      },
      () => {
        if (this.state.isValidInput) {
          this.context.action.createLottos(payment / 1000);
          this.formRef.current.reset();
        } else {
          this.context.action.createLottos(0);
        }
      }
    );
  }

  render() {
    return (
      <Form onSubmit={this.onSubmit} ref={this.formRef}>
        <label htmlFor="purchase-input">구입할 금액을 입력해주세요.</label>
        <div style={{ display: "flex", marginTop: "0.5rem" }}>
          <Input
            id="purchase-input"
            name="purchase-input"
            type="number"
            placeholder="구입 금액"
            min="1000"
            required
          />
          <Button type="submit">확인</Button>
        </div>
        {!this.state.isValidInput && (
          <ErrorMessageBox text="1000원 단위로 입력해주세요." />
        )}
      </Form>
    );
  }
}

PurchaseInput.contextType = LottoContext;
