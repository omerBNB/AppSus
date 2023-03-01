'use strict'

import { utilService } from "../../../services/util.service.js"
import { storageService } from '../../../services/async-storage.service.js'

const MAILS_KEY = 'Mails'
const emails = [{
    id: 'e101',
    subject: 'Miss you!',
    body: 'Would love to catch up sometimes and maybe hang out',
    isRead: false,
    isSelected:false,
    isStared:false,
    isImportant:false,
    sentAt : 1551133930594,
    removedAt : null,
    from: 'momo@momo.com',
    to: 'user@appsus.com'
    },
    {
    id: 'e102',
    subject: 'fsaafasfasf!',
    body: 'hi i am ido and i love alpakas, i also like to eat them',
    isRead: false,
    isSelected:false,
    isStared:false,
    isImportant:false,
    sentAt : 1551133930594,
    removedAt : null,
    from: 'ido@momo.com',
    to: 'user@appsus.com'
    },
    {
    id: 'e103',
    subject: 'scbvsvs!',
    body: 'hi i am omer and i love shawarma',
    isRead: false,
    isSelected:false,
    isStared:false,
    isImportant:false,
    sentAt : 1551133930594,
    removedAt : null,
    from: 'omer@momo.com',
    to: 'user@appsus.com'
    }]
const loggedinUser = {
        email: 'user@appsus.com',
        fullname: 'Mahatma Appsus'
       }
       
_createMails()

export const Mailservice = {
    query,
    get,
    remove,
    save,

}

function query(filterBy = {}) {
    return storageService.query(MAILS_KEY)
        .then(Mails => {
            console.log('Mails',Mails)
            if (filterBy.txt) {
                const regex = new RegExp(filterBy.txt, 'i')
                return Mails.filter(mail => regex.test(mail.body))
            }
            if(filterBy.isStared){
                return Mails.filter(mail => mail.isStared)
            }
            else{
                return Mails
            }
    })
}


function get(MailId) {
    return storageService.get(MAILS_KEY, MailId)
           .then(_setNextPrevMailId)
}

function remove(MailId) {
    return storageService.remove(MAILS_KEY, MailId)
}

function save(Mail) {
    if (Mail.id) {
        return storageService.put(MAILS_KEY, Mail)
    } else {
        return storageService.post(MAILS_KEY, Mail)
    }
}

function getEmptyMail(title = '', listPrice = 0) {
    return { id: '', title, listPrice }
}

function _createMails() {
    let Mails = utilService.loadFromStorage(MAILS_KEY)
    if (!Mails || !Mails.length) {
        Mails = emails
        utilService.saveToStorage(MAILS_KEY, Mails)
    }
}

function _createMail(title, listPrice = 250) {
    const Mail = getEmptyMail(title, listPrice)
    Mail.id = utilService.makeId()
    return Mail
}

function addReview(MailId, review) {
    const newReview = JSON.parse(JSON.stringify(review))
    return storageService.get(MAILS_KEY,MailId)
        .then(Mail => {
            newReview.id = utilService.makeId()
            if (!Mail.newReview) {
                Mail.newReview = [] 
            }
                Mail.newReview.push(newReview)
            
            return Mail
        })
        .then(Mail => save(Mail))
}

function deleteReview(reviewId,MailId){
    return storageService.get(MAILS_KEY,MailId)
    .then(Mail => {
       const idx = Mail.newReview.findIndex(review => review.id === reviewId)
        Mail.newReview.splice(idx,1)
        return Mail
    }
        )
        .then(Mail => save(Mail))
}

function _setNextPrevMailId(Mail) {
    return storageService.query(MAILS_KEY).then((Mails) => {
        const MailIdx = Mails.findIndex((currMail) => currMail.id === Mail.id)
        Mail.nextMailId = Mails[MailIdx + 1] ? Mails[MailIdx + 1].id : Mails[0].id
        Mail.prevMailId = Mails[MailIdx - 1]
            ? Mails[MailIdx - 1].id
            : Mails[Mails.length - 1].id
        return Mail
    })
}




