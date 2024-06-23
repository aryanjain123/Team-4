import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyABWwBZaUrrBBSd37BhzhGU1dKXUVrbJqk",
	authDomain: "gen-ai-accounting.firebaseapp.com",
	projectId: "gen-ai-accounting",
	storageBucket: "gen-ai-accounting.appspot.com",
	messagingSenderId: "473720807945",
	appId: "1:473720807945:web:3fde632790249130c20ed8",
	measurementId: "G-ZXYP6MEM7Z"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app); // Initialize Firestore

// Logout event listener
document.getElementById("logout").addEventListener("click", function() {
    signOut(auth)
        .then(() => {
            console.log('Sign-out successful.');
            alert('Sign-out successful.');
            window.location.href = "index.html"; // Redirect to index.html after logout
        })
        .catch((error) => {
            console.error('Error signing out:', error);
        });
});

// Form submission event listener
document.getElementById("query_form").addEventListener("submit", async function(event) {
    event.preventDefault(); // Prevent default form submission

    const queryInput = document.getElementById("query").value.trim().toLowerCase();

    if (queryInput !== "") {
        const user = auth.currentUser;
        if (user) {
            try {
                const results = await processQuery(user.uid, queryInput);
                console.log("Query results:", results);
                alert(`Query results:\n${results.join("\n")}`);
            } catch (error) {
                console.error("Error processing query:", error.message);
                alert("Failed to process query. Please try again later.");
            }
        } else {
            alert("No user is signed in. Please sign in to view data.");
            // Redirect to sign-in page or handle sign-in flow
            // Example: window.location.href = "signin.html";
        }
    } else {
        alert('Please enter a valid query.');
    }
});

// Function to process user query and retrieve matching fields' data
async function processQuery(uid, query) {
    const fieldMap = {
        "city": "city",
        "name": "name",
        "amount": "amount",
        "company": "company",
        "method": "method"
    };

    let results = [];

    // Iterate over each field and check if the query contains the field name
    for (const field in fieldMap) {
        if (query.includes(field)) {
            const result = await getFieldData(uid, fieldMap[field]);
            if (result) {
                results.push(`${field}: ${result}`);
            }
        }
    }

    if (results.length === 0) {
        results.push("Query not recognized or no data found.");
    }

    return results;
}

// Function to retrieve specific field data from Firestore
async function getFieldData(uid, field) {
    try {
        const docRef = doc(db, "database", uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const userData = docSnap.data();
            if (userData && userData[field]) {
                return userData[field];
            } else {
                return `${field} not found.`;
            }
        } else {
            return "User data not found.";
        }
    } catch (error) {
        console.error("Error getting document:", error.message);
        throw error;
    }
}

// Add an authentication state observer
auth.onAuthStateChanged((user) => {
    if (user) {
        console.log("User is signed in:", user);
    } else {
        console.log("No user is signed in.");
    }
});
