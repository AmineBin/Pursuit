// import des bibliothèques
const express = require('express')
const cors = require('cors')
const sqlite3 = require('sqlite3')
const dotenv = require('dotenv')

// créer l'instance du serveur
const app = express();

// configurer les middlewares
app.use(cors());
app.use(express.json()) // pour lire le JSON des requêtes

// connecter la bdd
const db = new sqlite3.Database('pursuitdb.db');

// router
app.get('/', (req, res) => {
    res.send('Serveur lancé')
})

// lancer le serveur
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000')
})


// --- Types ---


// récupérer les types d'objectifs
app.get('/api/types', (req, res) => {
    db.all('SELECT * FROM types', (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows); // tableau qui contient les types
    });
});


// --- Fréquences ---

// récupérer les fréquences
app.get('/api/frequencies', (req, res) => {
    db.all('SELECT * FROM frequencies', (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});


// --- Objectifs ---


// récupérer tous les objectifs
app.get('/api/goals', (req, res) => {
    db.all('SELECT * FROM goals', (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// récupérer les objectifs par fréquence
app.get('/api/goals/frequency', (req, res) => {
    const frequencyId = req.query.frequency_id;

    db.all('SELECT * FROM goals WHERE frequency_id = ?', [frequencyId], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// Ajouter un nouvel objectif
app.post('/api/goal', (req, res) => {
    const name = req.body.name;
    const description = req.body.description;
    const type_id = req.body.type_id;
    const frequency_id = req.body.frequency_id;
    const user_id = req.body.user_id;
    const created_at = req.body.created_at;
    const updated_at = req.body.updated_at;

    db.run('INSERT INTO goals ("name","description", "type_id","frequency_id","user_id", "created_at", "updated_at") VALUES (?,?,?,?,?,?,?)'
        , [name, description, type_id, frequency_id, user_id, created_at, updated_at], (err) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ message: "Objectif créé" });
        });
});

// modifier un objectif
app.patch('/api/goals/', (req, res) => {
    const goal_id = req.body.goal_id;
    const name = req.body.name;
    const description = req.body.description;
    const type_id = req.body.type_id;
    const frequency_id = req.body.frequency_id;
    const user_id = req.body.user_id;
    const updated_at = req.body.updated_at;

    db.run('UPDATE goals SET name = ?, description = ?, type_id = ?, frequency_id = ?, user_id = ?, updated_at = ?  WHERE goal_id = ?', [name, description, type_id, frequency_id, user_id, updated_at, goal_id], (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: "Objectif modifié" });
    });
});

// supprimer un objectif
app.delete('/api/goals/', (req, res) => {
    const goal_id = req.body.goal_id;
    db.run('DELETE FROM goals WHERE goal_id = ?', [goal_id], (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: "Objectif supprimé" });
    });
});




// --- Commentaires ---


// récupérer les commentaires
app.get('/api/comments', (req, res) => {
    db.all('SELECT * FROM comments ', (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows); // tableau qui contient les commentaires
    });
});

// Ajouter un nouveau commentaire
app.post('/api/comment', (req, res) => {
    const text = req.body.text;
    const created_at = req.body.created_at;
    const user_id = req.body.user_id;

    db.run('INSERT INTO comments ("text","created_at","user_id") VALUES (?,?,?)'
        , [text, created_at, user_id], (err) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ message: "Commentaire créé" });
        });
});

// modifier un commentaire
app.patch('/api/comments/', (req, res) => {
    const comment_id = req.body.comment_id;
    const text = req.body.text;
    const updated_at = req.body.updated_at;

    db.run('UPDATE comments SET text = ?, updated_at = ?  WHERE comment_id = ?', [text, updated_at, comment_id], (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: "Commentaire modifié" });
    });
});

// supprimer un commentaire
app.delete('/api/comments/', (req, res) => {
    const comment_id = req.body.goal_id;
    db.run('DELETE FROM comments WHERE comment_id = ?', [comment_id], (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: "Commentaire supprimé" });
    });
});

// --- Utilisateurs ---


app.get('/api/users/check-email', (req, res) => {
    db.get('SELECT 1 FROM users WHERE email = ?', [req.query.email], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ emailExists: !!row }); // tableau qui contient les utilisateurs
    });
});

app.get('/api/users/check-name', (req, res) => {
    db.get('SELECT 1 FROM users WHERE name = ?', [req.query.name], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ nameExists: !!row }); // tableau qui contient les utilisateurs
    });
});

app.post('/api/users', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;


    db.run('INSERT INTO users ("name", "email","password") VALUES (?,?,?)'
        , [name, email, password], (err) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ success: true, message: "Utilisateur créé" });
        });
});

