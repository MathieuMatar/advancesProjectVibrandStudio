const clients = [
    {
        "title": "Vibrand",
        "source": "https://www.api.vibrandstudio.com/media/clients/vibrand.webm"
    },
    {
        "title": "7cs",
        "source": "https://www.api.vibrandstudio.com/media/clients/7cs.webm"
    },
    {
        "title": "Alefia",
        "source": "https://www.api.vibrandstudio.com/media/clients/Alefia.webm"
    },
    {
        "title": "Alphabet",
        "source": "https://www.api.vibrandstudio.com/media/clients/Alphabet.webm"
    },
    {
        "title": "Animation",
        "source": "https://www.api.vibrandstudio.com/media/clients/animation.webm"
    },
    {
        "title": "Astella",
        "source": "https://www.api.vibrandstudio.com/media/clients/astella.webm"
    },
    {
        "title": "BARBARSoap",
        "source": "https://www.api.vibrandstudio.com/media/clients/BARBARSoap.webm"
    },
    {
        "title": "BatrounVillage",
        "source": "https://www.api.vibrandstudio.com/media/clients/batrounvillage.webm"
    },
    {
        "title": "Bkerke",
        "source": "https://www.api.vibrandstudio.com/media/clients/bkerke.webm"
    },
    {
        "title": "BKERKEJEUNE",
        "source": "https://www.api.vibrandstudio.com/media/clients/BKERKEJEUNE.webm"
    },
    {
        "title": "BuildIts",
        "source": "https://www.api.vibrandstudio.com/media/clients/buildits.webm"
    },
    {
        "title": "CastIron",
        "source": "https://www.api.vibrandstudio.com/media/clients/Castiron.webm"
    },
    {
        "title": "ChiaCatering",
        "source": "https://www.api.vibrandstudio.com/media/clients/chiacatering.webm"
    },
    {
        "title": "Citizen",
        "source": "https://www.api.vibrandstudio.com/media/clients/citizen.webm"
    },
    {
        "title": "Crushers",
        "source": "https://www.api.vibrandstudio.com/media/clients/Crushers.webm"
    },
    {
        "title": "FabroniaCatering",
        "source": "https://www.api.vibrandstudio.com/media/clients/fabroniaCATERING.webm"
    },
    {
        "title": "FabroniaCuisine",
        "source": "https://www.api.vibrandstudio.com/media/clients/FabroniaCuisine.webm"
    },
    {
        "title": "HawerwrAmem",
        "source": "https://www.api.vibrandstudio.com/media/clients/hawerwramem.webm"
    },
    {
        "title": "Hiwar",
        "source": "https://www.api.vibrandstudio.com/media/clients/hiwar.webm"
    },
    {
        "title": "Hooboor",
        "source": "https://www.api.vibrandstudio.com/media/clients/hooboor.webm"
    },
    {
        "title": "Lacazelle",
        "source": "https://www.api.vibrandstudio.com/media/clients/lacazelle.webm"
    },
    {
        "title": "LAMAR",
        "source": "https://www.api.vibrandstudio.com/media/clients/LAMAR.webm"
    },
    {
        "title": "LeMarche",
        "source": "https://www.api.vibrandstudio.com/media/clients/lemarche.webm"
    },
    {
        "title": "LogoCyprus",
        "source": "https://www.api.vibrandstudio.com/media/clients/logocyprus.webm"
    },
    {
        "title": "LPC",
        "source": "https://www.api.vibrandstudio.com/media/clients/LPC.webm"
    },
    {
        "title": "Maktabra3awiyatlMar2a",
        "source": "https://www.api.vibrandstudio.com/media/clients/maktabra3awiyatlMar2a.webm"
    },
    {
        "title": "Mamadounya",
        "source": "https://www.api.vibrandstudio.com/media/clients/mamadounya.webm"
    },
    {
        "title": "MartineIcons",
        "source": "https://www.api.vibrandstudio.com/media/clients/MARTINEICONS.webm"
    },
    {
        "title": "Minalalblelalb",
        "source": "https://www.api.vibrandstudio.com/media/clients/minalalblelalb.webm"
    },
    {
        "title": "ParacetamourAnimation",
        "source": "https://www.api.vibrandstudio.com/media/clients/paracetamouranimation%20.webm"
    },
    {
        "title": "Polanco",
        "source": "https://www.api.vibrandstudio.com/media/clients/Polanco.webm"
    },
    {
        "title": "Rays",
        "source": "https://www.api.vibrandstudio.com/media/clients/rays.webm"
    },
    {
        "title": "SAWA",
        "source": "https://www.api.vibrandstudio.com/media/clients/SAWA.webm"
    },
    {
        "title": "SinodosKhasbelMar2a",
        "source": "https://www.api.vibrandstudio.com/media/clients/sinodoskhasbelmar2a.webm"
    },
    {
        "title": "SmartUpEducation",
        "source": "https://www.api.vibrandstudio.com/media/clients/SmartUpeducation.webm"
    },
    {
        "title": "VAL",
        "source": "https://www.api.vibrandstudio.com/media/clients/VAL.webm"
    },
    {
        "title": "ViewLebanon",
        "source": "https://www.api.vibrandstudio.com/media/clients/VIEWLEBANON.webm"
    },
    {
        "title": "WS",
        "source": "https://www.api.vibrandstudio.com/media/clients/WS.webm"
    },
    {
        "title": "HUSJ",
        "source": "https://www.api.vibrandstudio.com/media/clients/default.png"
    },
    {
        "title": "B",
        "source": "https://www.api.vibrandstudio.com/media/clients/"
    }
];

export type Client = {
    id: number;
    name: string;
    image: string;
};

class ClientServices {
    static async getAll(): Promise<Client[]> {
        const response = await fetch('http://localhost:3000/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: `
        query {
          clients {
            id
            name
            image
          }
        }
      `,
            }),
        });

        const result = await response.json();
        return result.data.clients;
    }
}

export default ClientServices;