import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createRecordLecture } from '../../features/admin/adminActions';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .ttl {
    margin-top: 3rem;
  }
  & hr {
    width: 30%;
    border: none;
    height: 0.1rem;
    background: #ff2c55;
    margin: 1rem;
  }
  .input-container {
    width: 100%;
    height: 3.5rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
`;

const StyledInput = styled.input`
  font-size: 1rem;
  color: #ffffff;
  border: none;
  padding: 0.25rem 0.5rem;
  margin: 0.5rem 1rem 1rem;
  outline-color: #ffffff;
  width: 70%;
  display: inline;
  background-color: #3b3b3b;
  border-radius: 0.5rem;

  &[type='file'] {
    font-size: 0.7rem;
  }

  :hover {
    border-bottom: #ff2c55 0.08rem solid;
  }
`;

const StyledLabel = styled.label`
  font-size: small;
  line-height: 3.3rem;
`;

const StyledButton = styled.button`
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  width: 100%;
  padding: 0.5rem 1rem;
  margin-top: 2.5rem;
  background-color: #ff2c55;
  color: #ffffff;
  outline: none;
  cursor: pointer;
  opacity: 0.5;
  transition: 500ms;
  :hover {
    opacity: 1;
    font-weight: bold;
  }
`;

const AddRecordLecture = () => {
  const dispatch = useDispatch();

  const [lectureInfo, setLectureInputs] = useState({
    insId: '',
    lecCategory: 0,
    lecContents: '',
    lecGenre: '',
    lecLevel: '',
    lecPrice: '',
    lecTitle: '',
  });

  const [lecThumb, setLecThumb] = useState(null);

  const onChange = (e) => {
    const { name, value } = e.target;
    const nextInputs = {
      ...lectureInfo,
      [name]: value,
    };
    setLectureInputs(nextInputs);
  };

  const onChangeThumb = (e) => {
    setLecThumb(e.target.files[0]);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createRecordLecture({ lectureInfo, lecThumb }));
  };

  return (
    <Wrapper>
      <h1 className='ttl'>?????? ?????? ??????</h1>
      <hr/>
      <form onSubmit={onSubmit}>
        <div className='input-container'>
          <StyledLabel for="file">?????? ?????????</StyledLabel>
          <StyledInput id="file" type="file" onChange={onChangeThumb} accept='image/*'/>
        </div>
        <div className='input-container'>
          <StyledLabel for="insId">?????? ?????????</StyledLabel>
          <StyledInput id="insId" name="insId" onChange={onChange}  placeholder='?????? ???????????? ??????????????????' autoComplete='off'/>
        </div>
        <div className='input-container'>
          <StyledLabel for="lecTitle">?????? ??????</StyledLabel>
          <StyledInput id="lecTitle" name="lecTitle" onChange={onChange}  placeholder='?????? ????????? ??????????????????' autoComplete='off'/>
        </div>        
        <div className='input-container'>
          <StyledLabel for="lecContents">??????</StyledLabel>
          <StyledInput id="lecContents" name="lecContents" onChange={onChange}  placeholder='????????? ??????????????????' autoComplete='off'/>
        </div>
        <div className='input-container'>
          <StyledLabel for="lecPrice">??????</StyledLabel>
          <StyledInput
            type="number"
            id="lecPrice"
            name="lecPrice"
            onChange={onChange}
            placeholder='????????? ??????????????????' autoComplete='off'
          />
        </div>
        <div className='input-container'>
          <StyledLabel for="lecLevel">??????</StyledLabel>
          <StyledInput
            type="number"
            id="lecLevel"
            name="lecLevel"
            onChange={onChange}
            placeholder='????????? ??????????????????' autoComplete='off'
          />
        </div>
        <div className='input-container'>
          <StyledLabel for="lecGenre">??????</StyledLabel>
          <StyledInput id="lecGenre" name="lecGenre" onChange={onChange}  placeholder='????????? ??????????????????' autoComplete='off'/>
        </div>
        <StyledButton>????????????</StyledButton>
      </form>
    </Wrapper>
  );
};

export default AddRecordLecture;
