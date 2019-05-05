
import { Injectable } from '@angular/core';

@Injectable()
export class FirebaseService {

  private firebase = window['firebase']
  private firestore = this.firebase.firestore()
  private firestoreFieldValues = this.firebase.firestore.FieldValue

  constructor() {
    if (this.firebase == null) {
      throw ('Missing firebase on window object!')
    }
  }

  createUserWithEmailAndPassword(email: string, password: string): Promise<any> {
    return this.firebase.auth().createUserWithEmailAndPassword(email, password)
  }

  loginUserWithEmailAndPassword(email: string, password: string): Promise<any> {
    return this.firebase.auth().signInWithEmailAndPassword(email, password)
  }

  userLogout() {
    return this.firebase.auth().signOut()
  }

  setDataInFirestore(collection: string, document: string, data: object): Promise<any> {
    return this.firestore.collection(collection).doc(document).set(Object.assign({}, data))
  }

  updateDataInFirestore(collection: string, document: string, data: object): Promise<any> {
    return this.firestore.collection(collection).doc(document).update(Object.assign({}, data))
  }

  deleteDocumentFromFirestore(collection: string, document: string): Promise<any> {
    return this.firestore.collection(collection).doc(document).delete()
  }

  deleteFieldFromDocumentFirestore(collection: string, document: string, field: string): Promise<any> {
    return this.firestore.collection(collection).doc(document).update({ [field]: this.firestoreFieldValues.delete() })
  }

  queryFirestore(): FirestoreQuery {
    return new FirestoreQuery(this.firestore)
  }

}

class FirestoreQuery {

  private firestore
  private collectionToQuery
  private sentences = []
  private sentence = {}
  private startedAnd = false
  private OPERATORS = {
    EQUALS: '==',
    SMALLER: '<',
    SMALLER_OR_EQUALS: '<=',
    BIGGER: '>',
    BIGGER_OR_EQUALS: '>='
  }

  constructor(firestore) {
    this.firestore = firestore
  }

  fromCollection(collection: string): FirestoreQuery {
    this.collectionToQuery = collection
    return this
  }

  field(field: string): FirestoreQuery {
    this.sentence['field'] = field
    this.startedAnd = false
    return this
  }

  and(): FirestoreQuery {
    this.startedAnd = true
    return this
  }

  private putInsideArray() {
    this.sentences.push(Object.assign({}, this.sentence))
    this.sentence = {}
  }

  runQuery(): Promise<any> {
    if (this.collectionToQuery == null) throw Error('missing collection to query')
    if (this.sentences == null || this.sentences.length <= 0) throw Error('not even a single query was added')
    let toEval = this.firestore.collection(this.collectionToQuery)
    for (let i = 0; i < this.sentences.length; i++) {
      toEval = toEval.where(this.sentences[i]['field'], this.sentences[i]['op'], this.sentences[i]['value'])
    }
    return toEval.get().then(res => res.docs.map(element => element.data()))
  }

  equals(value: any): FirestoreQuery {
    if (this.startedAnd) throw Error('Cannot use "and" with "equals"')
    if (this.sentence['field'] == null) throw Error('missing "field" before "equals" operation')
    this.sentence['value'] = value
    this.sentence['op'] = this.OPERATORS.EQUALS
    this.putInsideArray()
    return this
  }

  smallerThan(value: any): FirestoreQuery {
    if (this.startedAnd) {
      this.startedAnd = false
      this.sentences.push({ field: this.sentences[this.sentences.length - 1]['field'], op: this.OPERATORS.SMALLER, value: value })
      return this
    }
    this.sentence['value'] = value
    this.sentence['op'] = this.OPERATORS.SMALLER
    this.putInsideArray()
    return this
  }

  biggerThan(value: any): FirestoreQuery {
    if (this.startedAnd) {
      this.startedAnd = false
      this.sentences.push({ field: this.sentences[this.sentences.length - 1]['field'], op: this.OPERATORS.BIGGER, value: value })
      return this
    }
    this.sentence['value'] = value
    this.sentence['op'] = this.OPERATORS.BIGGER
    this.putInsideArray()
    return this
  }

  smallerOrEqualsTo(value: any): FirestoreQuery {
    if (this.startedAnd) {
      this.startedAnd = false
      this.sentences.push({ field: this.sentences[this.sentences.length - 1]['field'], op: this.OPERATORS.SMALLER_OR_EQUALS, value: value })
      return this
    }
    this.sentence['value'] = value
    this.sentence['op'] = this.OPERATORS.SMALLER_OR_EQUALS
    this.putInsideArray()
    return this
  }

  biggerOrEqualsTo(value: any): FirestoreQuery {
    if (this.startedAnd) {
      this.startedAnd = false
      this.sentences.push({ field: this.sentences[this.sentences.length - 1]['field'], op: this.OPERATORS.BIGGER_OR_EQUALS, value: value })
      return this
    }
    this.sentence['value'] = value
    this.sentence['op'] = this.OPERATORS.BIGGER_OR_EQUALS
    this.putInsideArray()
    return this
  }

  notEqualsTo(value: any): FirestoreQuery {
    if (this.startedAnd) throw Error('Cannot use "and" with "notEqualsTo"')
    if (this.sentence['field'] == null) throw Error('missing "field" before "notEqualsTo" operation')
    this.sentences.push({ field: this.sentence['field'], op: this.OPERATORS.BIGGER, value: value })
    this.sentences.push({ field: this.sentence['field'], op: this.OPERATORS.SMALLER, value: value })
    this.sentence = {}
    return this
  }

}