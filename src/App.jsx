import { useReducer } from 'react'
import './App.css'

const initialState = {
  balance: 0,
  loan: 0,
  loanStatus: false,
  isActive: false
};

function reducer(state,action){
  switch(action.type){
    case "Open_Account":
      return(
        {
          ...state,
          balance:500,
          isActive:true,
        }
      )
    case "deposit":
      return{
        ...state,
        balance:state.balance+action.payload,
        
      }

    case "withdraw":
      return{
        ...state,
        balance:state.balance===0?0:state.balance-action.payload,
      }
    
      case "loan":
        return{
          ...state,
          balance:state.loan?state.balance:(state.balance+action.payload),
          loan:state.loan?state.loan:action.payload,
        }
      case "pay_loan":
        return{
          ...state,
          balance:state.loan?(state.balance-action.payload):state.balance,
          loan: state.loan && 0,
        }
      case "close_account":
        return{
          ...state,
          balance:state.loan===0&&state.balance===0?0:state.balance,
          loan:state.loan===0&&state.balance===0?0:state.loan,
          loanStatus:false,
          isActive:state.loan===0&&state.balance===0?false:true,
        }
  }
}

export default function App() {
  const[{balance,loan,isActive},dispatch]=useReducer(reducer,initialState)
  return (
    <div className="App">
      <h1>useReducer Bank Account</h1>
      <p>Balance: {balance}</p>
      <p>Loan: {loan}</p>

      <p>
        <button onClick={() => dispatch({type:"Open_Account"})} disabled={isActive}>
          Open account
        </button>
      </p>
      <p>
        <button onClick={() => dispatch({type:"deposit",payload:150})} disabled={!isActive}>
          Deposit 150
        </button>
      </p>
      <p>
        <button onClick={() => dispatch({type:"withdraw",payload:50})} disabled={!isActive}>
          Withdraw 50
        </button>
      </p>
      <p>
        <button onClick={() => dispatch({type:"loan",payload:5000})} disabled={!isActive}>
          Request a loan of 5000
        </button>
      </p>
      <p>
        <button onClick={() => dispatch({type:"pay_loan",payload:5000})} disabled={!isActive}>
          Pay loan
        </button>
      </p>
      <p>
        <button onClick={() => dispatch({type:"close_account"})} disabled={!isActive}>
          Close account
        </button>
      </p>
    </div>
  );
}
