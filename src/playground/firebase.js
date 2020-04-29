import * as firebase from 'firebase'

const firebaseConfig = {
apiKey: "AIzaSyCyBm6DC4jxOWTHEemS_x5qC8Xnw3Zj3aA",
authDomain: "pd-react-course-expensify.firebaseapp.com",
databaseURL: "https://pd-react-course-expensify.firebaseio.com",
projectId: "pd-react-course-expensify",
storageBucket: "pd-react-course-expensify.appspot.com",
messagingSenderId: "250446295738",
appId: "1:250446295738:web:ba93cfc0bbe14485a90883"
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

const database = firebase.database()


database.ref('expenses').on('child_removed', (snapshot) => {
    console.log('Child removed', snapshot.key, snapshot.val())
})

database.ref('expenses').on('child_changed', (snapshot, a2, a3) => {
    console.log('Child changed', snapshot.val(), a2, a3)
})

database.ref('expenses').on('child_added', (snapshot, a2, a3) => {
    console.log('Child added', snapshot.val(), a2, a3)
})

database.ref('expenses').on('value', (snapshot) => {
    const expenses = []
    snapshot.forEach((childSnapshot) => {
        expenses.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
        })
    })
    console.log('on expenses:', expenses)
})

database.ref('expenses')
    .once('value')
    .then((snapshot) => {
        //console.log(snapshot.val())
        const expenses = []
        snapshot.forEach((childSnapshot) => {
            expenses.push({
                id: childSnapshot.key,
                ...childSnapshot.val()
            })
        })
        console.log(expenses)
    })

database.ref('expenses').push({
    description: 'Rent',
    note: 'last month rent payment',
    amount: 105600,
    createdAt: 1
})

setTimeout(() => {
    database.ref('expenses').push({
        description: 'Coffee',
        note: 'raf',
        amount: 125,
        createdAt: 2
    })
}, 3000);

database.ref('expenses').push({
    description: 'Coffee',
    note: 'raf',
    amount: 125,
    createdAt: 2
})

database.ref().on('value', (snapshot) => {
    //console.log('Got snapshot', snapshot.val())
    const data = snapshot.val()
    console.log(`${data.name} is a ${data.job.title} at ${data.job.company}`)
})

setTimeout(() => {
    database.ref().update({
        'job/company': 'Lateos'
    })
}, 3000);

setTimeout(() => {
    database.ref('job/company').set('Azoft').then(() => {
        console.log('Updated data 1')
    }).catch((e) => {
        console.log('Error updating data 1', e)
    })
}, 2000);

database.ref('location')
    .once('value')
    .then((snapshot) => {
        const val= snapshot.val()
        console.log('Got snapshot', val)
    })
    .catch((e) => {
        console.log('Error fetching data', e)
    })

database.ref().set({
    name: 'Petr Dvukhrechensky',
    age: 35,
    stressLevel: 6,
    job: {
        title: 'Software developer',
        company: 'Lateos',
    },
    location: {
        city: 'Novosibirsk',
        country: 'Russia'
    },
  }).then(() => {
      console.log('initial data is saved', arguments)
  }).catch((e) => {
      console.log('It failed.', e)
  })

database.ref('isSingle')
    .remove()
    .then(() => {
        console.log('Data was removed')
    })
    .catch((e) => {
        console.log('Did not remove data', e)
    })

setTimeout(() => {
    database.ref().update({
        stressLevel: 9,
        'job/company': 'Amazon',
        'location/city': 'Seatle'
    }).then(() => {
        console.log('Updated data')
    }).catch((e) => {
        console.log('Error updating data', e)
    })
}, 4000);