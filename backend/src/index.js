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

// récupérer les objectifs par période
app.get('/api/goals/period', (req, res) => {
    const periodId = req.query.period_id;

    db.all('SELECT * FROM goals WHERE period_id = ?', [periodId], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// Ajouter un nouvel objectif
app.post('/api/goals', (req, res) => {
    const name = req.body.name;
    const type = req.body.type;
    const time = req.body.time;
    const quantity = req.body.quantity;
    const created_at = req.body.created_at;
    const updated_at = req.body.updated_at;
    const user_id = req.body.user_id;
    const periode_id = req.body.periode_id;

    db.run('INSERT INTO goals ("name","type_id","time","quantity","created_at","user_id","periode_id") VALUES (?,?,?,?,?,?,?)'
        , [name, type, time, quantity, created_at, user_id, periode_id], (err) => {
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
    const type = req.body.type;
    const time = req.body.time;
    const quantity = req.body.quantity;
    const updated_at = req.body.updated_at;

    db.run('UPDATE goals SET name = ?, type_id = ?, time = ?, quantity = ?, updated_at = ?  WHERE goal_id = ?', [name, type, time, quantity, updated_at, goal_id], (err) => {
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

// récupérer les commentaires
app.get('/api/comments', (req, res) => {
    db.all('SELECT * FROM comments ', (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows); // tableau qui contient les commentaires
    });
});


// --- Commentaires ---


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

