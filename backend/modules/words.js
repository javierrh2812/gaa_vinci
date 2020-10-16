#!/usr/bin/env node

const rl = require("readline")
//const low = require("fs")
const args = process.argv

const rooms = []
const words = [
   "chupetin trujillo",
   "causha",
   "bingo hot",
   "faraon love shady",
   "me bingo"
]

const prompt = q => {
   const r = rl.createInterface({
      input: process.stdin,
      output: process.stindout,
      terminal: false
   })
   return new Promise((res, err) => {
      r.question(q, a => {
         r.close()
         res(a)
      })
   })
}

prompt("escribe algo: ").then(a => {
   console.log("escribiste: " + a)
})
