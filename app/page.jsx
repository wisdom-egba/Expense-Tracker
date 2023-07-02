"use client"
import React, { useEffect, useState } from "react"
import { BsTrash } from "react-icons/bs"
import {
  collection,
  addDoc,
  query,
  QuerySnapshot,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore"
import { db } from "./firebase"
import Header from "@/components/Header"
import { useSession } from "next-auth/react"
export default function Home() {
  const { status } = useSession()
  const [items, setItems] = useState([
    // { name: "coffee", price: 40 },
    // { name: "uber", price: 90 },
    // { name: "popcorn", price: 60 },
  ])

  const [total, setTotal] = useState(0)

  const [newItems, setNewItems] = useState([{ name: "", price: "" }])

  //Add Item
  const addItem = async (e) => {
    e.preventDefault()
    if (newItems.name !== "" && newItems.price !== "") {
      setItems([...items, newItems])
      await addDoc(collection(db, "items"), {
        name: newItems.name,
        price: newItems.price,
      })
      setNewItems({ name: "", price: "" })
    }
  }

  //Read Items

  useEffect(() => {
    const q = query(collection(db, "items"))
    const unsuscribe = onSnapshot(q, (QuerySnapshot) => {
      let itemArr = []
      QuerySnapshot.forEach((doc) => {
        itemArr.push({ ...doc.data(), id: doc.id })
      })
      setItems(itemArr)

      //Calculate total
      const calculateTotal = () => {
        const totalPrice = itemArr.reduce(
          (sum, item) => sum + parseFloat(item.price),
          0
        )
        setTotal(totalPrice)
      }
      calculateTotal()
      return () => unsuscribe()
    })
  }, [])

  //Delete item
  const deleteItem = async (id) => {
    await deleteDoc(doc(db, "items", id))
  }
  if (status === "authenticated") {
    return (
      <>
        <main className="flex min-h-screen flex-col items-center justify-between md:p-24 p-6">
          <div className="z-10 w-full md:max-w-5xl items-center justify-between font-mono text-sm lg:flex">
            <h1 className="text-4xl p-4 text-center">Expense Tracker</h1>

            <div className=" bg-gray-400 p-5 rounded-lg">
              <form
                action=""
                className="grid grid-cols-6 items-center text-black"
              >
                <input
                  className=" col-span-3 p-3 rounded-md outline-none"
                  type="text"
                  placeholder="Enter Item"
                  onChange={(e) =>
                    setNewItems({ ...newItems, name: e.target.value })
                  }
                  value={newItems.name}
                />
                <input
                  className="col-span-2 p-3 rounded-md mx-2 md:mx-4 outline-none"
                  type="number"
                  placeholder="$price"
                  onChange={(e) =>
                    setNewItems({ ...newItems, price: e.target.value })
                  }
                  value={newItems.price}
                />
                <button
                  onClick={addItem}
                  className="bg-gray-700 p-1 text-white text-2xl rounded-md hover:bg-gray-500"
                  type="submit"
                >
                  +
                </button>
              </form>
            </div>

            <ul>
              {items.map((item, id) => (
                <li
                  key={id}
                  className="flex justify-between my-6 p-2 rounded-md capitalize items-center bg-slate-950"
                >
                  <div className=" w-full flex justify-between p-2">
                    <span>{item.name}</span>
                    <span>${item.price}</span>
                  </div>
                  <div
                    onClick={() => deleteItem(item.id)}
                    className="ml-8 p-4 border-l-2 border-gray-700 hover:text-red-500"
                  >
                    <BsTrash />
                  </div>
                </li>
              ))}
            </ul>
            {items.length < 1 ? (
              ""
            ) : (
              <div className="flex justify-evenly mt-12">
                <span>Total:</span>
                <h1>
                  $ <span className="text-green-500">{total}</span>
                </h1>
              </div>
            )}
          </div>
        </main>
      </>
    )
  } else {
    return <Header />
  }
}
