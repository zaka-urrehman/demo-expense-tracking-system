'use client'
import  { useState } from 'react';



interface Transaction {
  // id: string;
  amount: number;
  description: string;
}

enum TransactionType {
  Expense = 'expense',
  Income = 'income',
}



export default function Home() {

  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')
  const [transactionType, setTransactionType] = useState(TransactionType.Expense)
  const [transactions,setTransactions]=useState<Transaction[]>([ ])

  const addTransaction =()=>{
    if(amount && description)
      {
        const newTransaction : Transaction={
          amount : transactionType === TransactionType.Expense? -parseFloat(amount): parseFloat(amount),
          description: description         
        }
        setTransactions([...transactions, newTransaction] );
        setAmount('');
        setDescription("");
      }
  }


  const income=()=>{
    const positiveTransactions = transactions.filter((transaction)=>transaction.amount > 0)
    const totalIncome = positiveTransactions.reduce((total,transaction)=> total+transaction.amount,0)
    return totalIncome
  }

  const expense=()=>{
    const negativeTransactions = transactions.filter((transaction)=>transaction.amount<0)
    const totalExpense = negativeTransactions.reduce((total,transaction)=>total+transaction.amount,0)
    return totalExpense
  }

  const balance=()=>{

  }


  return (
    <div className="flex justify-center items-center">
      <div className="max-w-5xl bg-cyan-200 py-10 px-10 ">
        <h1 className="font-bold text-2xl text-center">Expense Tracking System</h1>

        <div className="bg-gray-100 flex px-4 py-6 w-fit mx-auto m-2 rounded-xl">
          <h3 className="font-bold">Available Balance:</h3>
          <span className="ml-2">{income()+expense()}</span>
        </div>

        <div className="flex gap-x-4">

          <div className="  px-4 pt-4 pb-8 rounded-lg w-32 mx-auto bg-gradient-to-b from-[#68ff0026] to-[#41f565]">
            <h3 className="font-bold text-[#00d800] text-center">Earnings:</h3>
            <div className=" text-center text-white font-bold">{income()}</div>
          </div>

          <div className="  px-4 pt-4 pb-8 rounded-lg w-32 mx-auto bg-gradient-to-b from-[#c98a8a26] to-[#ed6262]">
            <h3 className="font-bold text-[#dc5959] text-center">Spendings:</h3>
            <div className=" text-center text-white font-bold">{expense()}</div>
          </div>



        </div>




        <div className="bg-slate-200 m-4 p-4">
          <h1 className="text-center font-semibold m-5">Transaction History</h1>

          {transactions.map((trans)=>(
            <div>
                   <div className={`" my-1 flex justify-between p-2 rounded-lg shadow-lg " ${trans.amount>0?"bg-green-300":"bg-red-300"}`}>
                   <h3>{trans.description}</h3>
                   <h3>{trans.amount>0?'+':''}{trans.amount} </h3>
                  </div>
            </div>
          ))}
          
        </div>



        <div>
          <h3 className="text-center font-bold text-2xl my-6">Add a new Transaction</h3>


          <div>
            <label className="m-2 font-semibold" >Select Transaction Type:</label>
            <select 
            name="Transaction Type" 
            value={transactionType}
            onChange={(e)=>setTransactionType(e.target.value as TransactionType)}
            className="ml-2">
              <option value={TransactionType.Expense}>Expense</option>
              <option value={TransactionType.Income}>Income</option>
            </select>
          </div>

          <div className="m-2 flex flex-col justify-center mt-6 ">
            <label htmlFor="amount" className="font-semibold ml-2">Enter Amout</label>
            <input 
             type="number"
             id='amount'
             placeholder="Amount" 
             value={amount}
             onChange={(e)=>setAmount(e.target.value)}
             className="px-2 py-2 rounded-3xl border-[5px] focus:border-gray-300 focus:scale-105" />
          </div>

          <div className="m-2 flex flex-col justify-center mt-6 ">
            <label htmlFor="description" className="font-semibold ml-2">Enter Description</label>
            <input 
            type="text"
            id='description' 
            placeholder="Description" 
            onChange={(e)=>setDescription(e.target.value)}
            className="px-2 py-2 rounded-3xl border-[5px] focus:border-gray-300 focus:scale-105" />
          </div>



          <div className=" mt-6 flex justify-center">

            <button 
             type="submit"
             className="bg-blue-400 text-white font-semibold rounded-xl px-8 py-2 text-center hover:scale-110 active:bg-blue-600"
             onClick={addTransaction}
             > Submit</button>

          </div>



        </div>

      </div>
    </div>
  )
}