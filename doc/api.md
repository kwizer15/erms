# API

## /signs

### GET

Récupère toutes les demandes de contact

#### Paramètres

| Paramètre | Désignation | Valeur par défaut | Valeurs autorisée |
| --- | --- | --- | --- |
| `sort` | Tri les demandes de contact | `!date` | `date`, `name`, `phone`, préfixés par `!` inverse l'ordre |

### POST

Enregistre une demande de contact

#### Paramètre

Modèle de donnée

```javascript
{
	name: "John Doe", # Obligatoire
	phone: "0102030405", # Obligatoire
	date: "", # Attribué automatiquement
	contactsMade: [{
		date: "",
		report: "",
		actionFollow: "",
	}]
}
```