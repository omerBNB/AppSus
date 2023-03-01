'use strict'

// import { utilService } from './util.service.js'
// import { storageService } from './async-storage.service.js'

const NOTES_KEY = 'notesDB'

export const noteService = {
  query,
}

const notes = [
  {
    id: 'n101',
    createdAt: 1112222,
    type: 'NoteTxt',
    isPinned: true,
    style: {
      backgroundColor: '#00d',
    },
    info: {
      txt: 'Fullstack Me Baby!',
    },
  },

  {
    id: 'n102',
    type: 'NoteImg',
    isPinned: false,
    info: {
      url: 'https://www.thesprucepets.com/thmb/hxWjs7evF2hP1Fb1c1HAvRi_Rw0=/2765x0/filters:no_upscale():strip_icc()/chinese-dog-breeds-4797219-hero-2a1e9c5ed2c54d00aef75b05c5db399c.jpg',
      title: 'Bobi and Me',
    },
    style: {
      backgroundColor: '#00d',
    },
  },
  {
    id: 'n103',
    type: 'NoteTodos',
    isPinned: false,
    info: {
      title: 'Get my stuff together',
      todos: [
        { txt: 'Driving license', doneAt: null },
        { txt: 'Coding power', doneAt: 187111111 },
      ],
    },
  },
]

// _createCars()

function query() {
  //   return storageService.query(CAR_KEY).then((cars) => {
  //     if (filterBy.txt) {
  //       const regex = new RegExp(filterBy.txt, 'i')
  //       cars = cars.filter((car) => regex.test(car.vendor))
  //     }
  //     if (filterBy.minSpeed) {
  //       cars = cars.filter((car) => car.maxSpeed >= filterBy.minSpeed)
  //     }
  return notes
  //   })
}

function get(noteId) {
  return storageService.get(NOTES_KEY, noteId)
  // .then(_setNextPrevNoteId)
}

function remove(noteId) {
  return storageService.remove(NOTES_KEY, noteId)
}

function save(note) {
  if (note.id) {
    return storageService.put(NOTES_KEY, note)
  } else {
    return storageService.post(NOTES_KEY, note)
  }
}

// function getEmptyNote(vendor = '', maxSpeed = 0) {

function getEmptyNote() {
  return { id: '' }
}

function _createNotes() {
  let notes = utilService.loadFromStorage(NOTES_KEY)
  if (!notes || !notes.length) {
    notes = []
    notes.push(_createNote('audu', 300))
    utilService.saveToStorage(NOTES_KEY, cars)
  }
}

function _createNote(vendor, maxSpeed = 250) {
  const note = getEmptyNote(vendor, maxSpeed)
  note.id = utilService.makeId()
  return note
}

// function _setNextPrevNoteId(note) {
//   return storageService.query(NOTES_KEY).then((cars) => {
//     const carIdx = cars.findIndex((currCar) => currCar.id === car.id)
//     car.nextCarId = cars[carIdx + 1] ? cars[carIdx + 1].id : cars[0].id
//     car.prevCarId = cars[carIdx - 1] ? cars[carIdx - 1].id : cars[cars.length - 1].id
//     return car
//   })
// }
