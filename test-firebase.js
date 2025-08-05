import { db } from './lib/firebase.ts'
import { collection, addDoc } from 'firebase/firestore'

async function testFirebase() {
  try {
    const docRef = await addDoc(collection(db, 'test'), {
      message: 'Test',
      timestamp: new Date()
    })
    console.log('Documento creado:', docRef.id)
  } catch (error) {
    console.error('Error:', error)
  }
}

testFirebase()
