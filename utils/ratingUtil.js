'use strict'

const getUserRating = (user) => {
  const userUnderwritings = generateUserUnderwritings();
  const updatedUser = Object.assign(user);
  updatedUser.cibil = userUnderwritings.cibil;
  updatedUser.mab = userUnderwritings.mab;
  updatedUser.socialscore = userUnderwritings.socialscore;
  updatedUser.debit2income = userUnderwritings.debit2income;
  let score = 0;
  if (updatedUser.panStatus === 'verified') {
  score=+5;
  }
  if(updatedUser.aadhaarStatus === 'verified'){
  score=+5;
  }
 
  // social media score
  score = score+ updatedUser.socialscore/20;
  // mab score 
  if(updatedUser.mab){
    const mab = updatedUser.mab;
    if(mab >= 500000) score = score + (100/20)
    if(mab <= 500000 && mab > 400000) score = score + (90/5)
    if(mab <= 400000 && mab > 200000) score = score + (80/5)
    if(mab <= 50000 && mab > 200000) score = score + (70/5)
    if(mab <= 20000 && mab > 500000) score = score + (60/5)
    if(mab < 20000 ) score = score + (50/20)
  }
  //cibil score
  if(updatedUser.cibil){
    const cibil = updatedUser.cibil;
    if(cibil >= 800 && cibil <= 900){
      score = score + 50;
    }
    if(cibil >= 700 && cibil < 800){
      score = score + 45;
    }
    if(cibil >= 600 && cibil < 700){
      score = score + 40;
    }
    if(cibil >= 500 && cibil < 600){
      score = score + 35;
    }
    if( cibil < 500){
      score = score + 20;
    }

  }
  // debit to income score
  if(updatedUser.debit2income){
    score = score + (updatedUser.debit2income * 0.25)
    if(updatedUser.debit2income > 40){
      score =0;
    }
  }
  // amount eligibilty
  let eligibleAmount = 0;
  if(score > 80){
    eligibleAmount = 100000;
  }
  if(score >= 70 && score < 80){
    eligibleAmount = 700000;
  }
  if(score >= 60 && score < 70){
    eligibleAmount = 700000;
  }
  if(score >= 50 && score < 60){
    eligibleAmount = 500000;
  }
  if(score >= 40 && score < 50){
    eligibleAmount = 250000;
  }
  if(score >= 30 && score < 40){
    eligibleAmount = 100000;
  }
  updatedUser.eligibleAmount = eligibleAmount;
  updatedUser.score =score;
  return updatedUser;
}

const generateUserUnderwritings = ()=>{
return {cibil:getRandomInt(300,900),mab:getRandomInt(1000,100000),socialscore:getRandomInt(30,90),debit2income:getRandomInt(10,80)}
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

module.exports = {
  getUserRating
}