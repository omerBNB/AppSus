'use strict'

import { utilService } from "../../../services/util.service.js"
import { storageService } from '../../../services/async-storage.service.js'

const MAILS_KEY = 'Mails'
const TRASH_MAILS = 'TrashMail'
const SHRAE_MAIL = 'shareMailDB'
const DRAFT_MAIL = 'draftMailDB'

const emails = [{
    id: 'e101',
    subject: 'I HAVE SOME MONEY TO GIVE YOU!!!',
    body: ' SCAM - hi, i have a lot of money because i am a price - can you give me your bank account for transfer?',
    isRead: false,
    isSelected: false,
    isStared: false,
    isImportant: false,
    sentAt: 1551133930594,
    removedAt: null,
    from: 'nigerianprince@lies.com',
    to: 'user@appsus.com'
},
{
    id: 'e102',
    subject: 'fsaafasfasf!',
    body: ' hi i am ido and i love alpakas, i also like to eat them',
    isRead: false,
    isSelected: false,
    isStared: false,
    isImportant: false,
    sentAt: 1551133930594,
    removedAt: null,
    from: 'ido@momo.com',
    to: 'user@appsus.com'
},
{
    id: 'e103',
    subject: 'scbvsvs!',
    body: ' hi i am omer and i love shawarma',
    isRead: false,
    isSelected: false,
    isStared: false,
    isImportant: false,
    sentAt: 1551133930594,
    removedAt: null,
    from: 'omer@momo.com',
    to: 'user@appsus.com'
},
{
    id: 'e104',
    subject: 'yeaaaaaaaaa!',
    body: ' love to sing la la lal al la lal al la lala lal al lal ala ',
    isRead: false,
    isSelected: false,
    isStared: false,
    isImportant: false,
    sentAt: 1551133930594,
    removedAt: null,
    from: 'dodayaron@momo.com',
    to: 'user@appsus.com'
},
{
    id: 'e105',
    subject: 'wohhwwwoaww!',
    body: ' hello there whats upppppppp',
    isRead: false,
    isSelected: false,
    isStared: false,
    isImportant: false,
    sentAt: 1551133930594,
    removedAt: null,
    from: 'rochama@momo.com',
    to: 'user@appsus.com'
},
{
    id: 'e106',
    subject: 'SSJ3!',
    body: ' hi i am goku, would you like me to teach you what is POWER?!',
    isRead: false,
    isSelected: false,
    isStared: false,
    isImportant: false,
    sentAt: 1551133930594,
    removedAt: null,
    from: 'goku@momo.com',
    to: 'user@appsus.com'
},
{
    id: 'e107',
    subject: 'Job Alert!!',
    body: ' This is Google, want to work with Us? 🥳',
    isRead: false,
    isSelected: false,
    isStared: false,
    isImportant: false,
    sentAt: 1551133930594,
    removedAt: null,
    from: 'google@recruit.com',
    to: 'user@appsus.com'
},
{
    id: 'e108',
    subject: 'Special Offer!!',
    body: ' My Name is Yuval Hamebulbal, want to sniff some coca with me?',
    isRead: false,
    isSelected: false,
    isStared: false,
    isImportant: false,
    sentAt: 1551133930594,
    removedAt: null,
    from: 'yubal@drugs.com',
    to: 'user@appsus.com'
},
{
    id: 'e109',
    subject: 'Mr Meseeks!!!',
    body: ' Hi, I Am Mr Meseeks look at me!!!',
    isRead: false,
    isSelected: false,
    isStared: false,
    isImportant: false,
    sentAt: 1551133930594,
    removedAt: null,
    from: 'mrmeseeks@morty.com',
    to: 'user@appsus.com'
},
]
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
    createMail,
    getSentMails,
    saveTrashedMail,
    queryTrashedMail,
    removeTrashedMail,
    getImportantMails,
    getDraftMail,
    saveDraftMail,
    CreateNoteMail,
    saveToNotes,
    removeDraftedMail
}

function query(filterBy = {}) {
    return storageService.query(MAILS_KEY)
        .then(Mails => {
            let onlyUserMails = Mails.filter(mail => mail.from !== 'user@appsus.com')
            if (filterBy.txt) {
                const regex = new RegExp(filterBy.txt, 'i')
                return onlyUserMails.filter(mail => regex.test(mail.body))
            }
            if (filterBy.isStared) {
                return onlyUserMails.filter(mail => mail.isStared)
            }
            else {
                return onlyUserMails
            }
        })
}

function getImportantMails(filterBy = {}) {
    return storageService.query(MAILS_KEY)
        .then(Mails => {
            let onlyUserMails = Mails.filter(mail => mail.from !== 'user@appsus.com')
            if (filterBy.isImportant) {
                return onlyUserMails.filter(mail => mail.isImportant)
            } else {
                return onlyUserMails
            }
        })
}

function queryTrashedMail(filterBy = {}) {
    return storageService.query(TRASH_MAILS)
        .then(Mails => {
            if (filterBy.txt) {
                const regex = new RegExp(filterBy.txt, 'i')
                return Mails.filter(mail => regex.test(mail.body))
            }
            if (filterBy.isStared) {
                return Mails.filter(mail => mail.isStared)
            }
            else {
                return Mails
            }
        })
}

function getSentMails(filterBy = {}) {
    return storageService.query(MAILS_KEY)
        .then(Mails => {
            let onlySentMails = Mails.filter(mail => mail.from === 'user@appsus.com' && !mail.mailIsDraft)
            if (filterBy.txt) {
                const regex = new RegExp(filterBy.txt, 'i')
                return onlySentMails.filter(mail => regex.test(mail.body))
            }
            if (filterBy.isStared) {
                return onlySentMails.filter(mail => mail.isStared)
            }
            else {
                return onlySentMails
            }
        })
}


function getDraftMail() {
    return storageService.query(DRAFT_MAIL)
}

function get(MailId) {
    return storageService.get(MAILS_KEY, MailId)
        .then(_setNextPrevMailId)
}

function remove(MailId) {
    return storageService.remove(MAILS_KEY, MailId)
}

function removeTrashedMail(MailId) {
    return storageService.remove(TRASH_MAILS, MailId)
}
function removeDraftedMail(MailId) {
    return storageService.remove(DRAFT_MAIL, MailId)
}

function saveTrashedMail(Mail) {
    Mail.id = null
    if (Mail.id) {
        return storageService.put(TRASH_MAILS, Mail)
    } else {
        Mail.removedAt = Date.now()
        return storageService.post(TRASH_MAILS, Mail)
    }
}
function save(Mail) {
    if (Mail.id) {
        return storageService.put(MAILS_KEY, Mail)
    } else {
        return storageService.post(MAILS_KEY, Mail)
    }
}
function saveToNotes(Mail) {
    if (Mail.id) {
        return storageService.put(SHRAE_MAIL, Mail)
    } else {
        return storageService.post(SHRAE_MAIL, Mail)
    }
}
function saveDraftMail(Mail){
    if (Mail.id) {
        return storageService.put(DRAFT_MAIL, Mail)
    } else {
        return storageService.post(DRAFT_MAIL, Mail)
    }
}

function createDraftMail(){
    return {
        id: 'dr110',
        subject: '',
        body: '',
        isRead: false,
        isSelected: false,
        isStared: false,
        isImportant: false,
        mailIsDraft: true,
        sentAt: 1551133930594,
        removedAt: null,
        from: 'user@appsus.com',
        to: ''
    }
}

function getEmptyMail() {
    return { id: '', title, listPrice }
}

function _createMails() {
    let Mails = utilService.loadFromStorage(MAILS_KEY)
    if (!Mails || !Mails.length) {
        Mails = emails
        utilService.saveToStorage(MAILS_KEY, Mails)
    }
}


function CreateNoteMail(title, text) {
    return {
        id: null,
        info: { title, text},
        isPinned: false,
        type:'NoteEmail',
        style:{backgroundColor:'#ECF2FF'},
        // isSelected: false,
        // isStared: false,
        // isImportant: false,
        // sentAt: Date.now(),
        // removedAt: null,
        // from: loggedinUser.email,
        // to,
    }
}

function createMail(to, subject, body, mailIsDraft) {
    const Mail = {
        id: null,
        subject,
        body,
        isRead: false,
        isSelected: false,
        isStared: false,
        isImportant: false,
        sentAt: Date.now(),
        removedAt: null,
        mailIsDraft,
        from: loggedinUser.email,
        to,
    }

    return save(Mail)
}

function addReview(MailId, review) {
    const newReview = JSON.parse(JSON.stringify(review))
    return storageService.get(MAILS_KEY, MailId)
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

function deleteReview(reviewId, MailId) {
    return storageService.get(MAILS_KEY, MailId)
        .then(Mail => {
            const idx = Mail.newReview.findIndex(review => review.id === reviewId)
            Mail.newReview.splice(idx, 1)
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




