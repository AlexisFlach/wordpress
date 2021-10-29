# Headless CMS 

Vad menas med Headless CMS?

Med ett headless CMS menas att vi endast använder oss av CMS som back-end service.

Termen "headless" kommer från att vi *tar bort* huvudet(front-end) från body (back-end).

Om vi omvandlar vårt tidigare arbetssätt till headless cms så går stegen till så som följer:

1. ###### Starta upp ett nytt wordpress-projekt lokalt.

Jag kommer i detta exempel använda mig av Docker Compose, men välj det sätt som du gillar bäst.

2. ###### Gör de vanliga grundläggande inställningarna.

    - Byt permalinks tills posts
    - Skapa en frontpage och ändra dess inställning till att vara just frontpage

3. ###### Ladda ned Postman

Postman är ett användbart verktyg i att arbeta med REST då vi kan skicka requests och inspeketer dessa responser.

 <img src=".\assets\1.png" alt="image-20211029124034619" style="zoom:50%;" />

4. 

Ändra nu request från GET till POST. 

**Headers** 

```
Content-Type: Application/json
```

**Body->raw**

```json
{
    "title": "This is my post",
    "content": "this is the post content",
    "status": "publish"
}
```

Vi får nu ett meddelande om att vi inte har permission att utföra denna request. Vi måste helt enkelt authentisera oss.

Gå in på plugins och sök efter **JWT Auth**.

I **.htaccess**:

```
RewriteCond %{HTTP:Authorization} ^(.*)
RewriteRule ^(.*) - [E=HTTP_AUTHORIZATION:%1]
SetEnvIf Authorization "(.*)" HTTP_AUTHORIZATION=$1
</IfModule>
```

.htaccess är en konfigurations-fil för Apache Web Server.

I **wp-config.php**

```
define('JWT_AUTH_SECRET_KEY', 'secret');
define('JWT_AUTH_CORS_ENABLE', true);
```

Skicka nu en POST request till http://localhost:8000/wp-json/jwt-auth/v1/token

**Headers**

```
Content-Type: Application/json
```

 <img src=".\assets\2.png" alt="image-20211029124034619" style="zoom:50%;" />

Som respons bör ni nu förhoppningsvis få tillbaka

```
{
    "success": true,
    "statusCode": 200,
    "code": "jwt_auth_valid_credential",
    "message": "Credential is valid",
    "data": {
        "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMCIsImlhdCI6MTYzNTUwNzgzOSwibmJmIjoxNjM1NTA3ODM5LCJleHAiOjE2MzYxMTI2MzksImRhdGEiOnsidXNlciI6eyJpZCI6MSwiZGV2aWNlIjoiIiwicGFzcyI6ImI1MTMwZGMyNzViNDJkNWYzY2VlNGU5NjY5MjFhZWY3In19fQ.oP40oHXNo5Kti",
        "id": 1,
        "email": "example@email.com",
        "nicename": "alex",
        "firstName": "",
        "lastName": "",
        "displayName": "alex"
    }
}
```

Kopiera ut **token** och skapa en ny POST request till http://localhost:8000/wp-json/wp/v2/posts

**Headers**

```
Content-Type: Application/json
Authorization: Bearer TOKEN
```

###### 4. Custom Post Type UI

Lägg till och aktivera plugin Custom Post Type UI.

Välj **Add/edit post types**.

Välj så ni får följande inställningar:

```
name: project
label: Projects
singular_label: Project
show_in_rest: true
rest_base: projects
supports:
	title
	editor
	Featured Image
	Excerpt
```

Gå till admin-panelen och lägg till en gäng projects och inludera Featured Image.

Från postman kan vi nu skapa en GET request till http://localhost:8000/wp-json/wp/v2/projects/ och se våra projekt.

###### 5. Advanced Custom Fields

Lägg till och aktivera plugin Advanced Custom Fields.



<img src=".\assets\3.png" alt="image-20211029124034619" style="zoom:50%;" />

###### 6. create-react-app

```
npx create-react-app --use-npm frontend
```

###### 7. axios

```
npm install axios react-router-dom
```

I **package.json**

```
},
  "proxy": "http://localhost:8000"
}
```

Eller vilken port ni än använder.

Skapa följande filer

```
src
	...
	components
		projects.js
		ProjectPage.js
		ProjectItem.js
```

**Projects.js**

```
import React, {useState, useEffect} from 'react'
import axios from 'axios';

import ProjectItem from './ProjectItem'

const Projects = () => {

    const  [project, setProject] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    axios.get('/wp-json/wp/v2/projects')
    .then(res => {
        setProject(res.data)
        setIsLoaded(true)
    })
  }, [])

    return (
        <div>
            {project.map(project => {
                return <ProjectItem key={project.id} project={project} />
            })}
        </div>
    )
}

export default Projects
```

**ProjectItem.js**

```
import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom';
import axios from 'axios';

const ProjectItem = ({project}) => {

    const [image, setImage] = useState('');
    const {githublink} = project.acf
    const {featured_media} = project;
    useEffect(async() => {
     const res = await axios.get(`/wp-json/wp/v2/media/${featured_media}`)
     setImage(res.data.media_details.sizes.full.source_url)
    
    })
    return (
        <div>
            <h2>{project.title.rendered}</h2>
            <div dangerouslySetInnerHTML={{__html: project.excerpt.rendered}}/>
            <img style={{width: '50%'}}src={ image } alt={project.title.rendered} />
            <a href={githublink} class="button">Go to github</a>
            <Link to={`/project/${project.id}`}>Go to page</Link>
            
        </div>
    )
}

export default ProjectItem
```

**ProjectPage.js**

```
import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProjectPage = () => {

    const [book, setBook] = useState({})
    const [isLoaded, setIsload] = useState(false);

    const params = useParams();

    useEffect(async () => {
        const res = await axios.get(`/wp-json/wp/v2/projects/${params.id}`)
        const done = await res.data;
        setBook(done)
        setIsload(true)
    }, [] )

    return (
        <div>
           {
           isLoaded ? <h1>{book.title.rendered}</h1>
           : <p>Not found</p>
}
        </div>
    )
}

export default ProjectPage
```

**app.js**

```
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Projects from './components/Projects'
import ProjectPage from './components/ProjectPage'

const App = () => {
  return (
    <Router>
    <div className="App">

      <Route exact path="/" component={Projects} />
      <Route exact path="/project/:id" component={ProjectPage} />
    
    </div>
    </Router>
  );
}

export default App;
```

