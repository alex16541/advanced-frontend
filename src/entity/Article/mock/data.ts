import { ArticleBlockType, ArticleType } from '../model/consts/article';
import { Article } from '../model/types/article';

export const article: Article = {
    id: '1',
    title: 'Some long long long test title',
    img: 'https://telegra.ph/file/a1f1db7dbdf2f7e2cd3d0.jpg',
    type: [ArticleType.ART, ArticleType.IT, ArticleType.LIFE],
    blocks: [
        {
            id: '1',
            paragraphs: [
                `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis 
            reprehenderit, impedit, unde ipsa odio tenetur, beatae non accusamus 
            voluptate temporibus tempora voluptates 
            dolorem minima ab quod. Consectetur aut eligendi unde 
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis 
            reprehenderit, impedit, unde ipsa odio tenetur, beatae non accusamus 
            voluptate temporibus tempora voluptates 
            dolorem minima ab quod. Consectetur aut eligendi unde.`,
            ],
            type: ArticleBlockType.TEXT,
        },
    ],
    subtitle: '',
    views: 1111,
    user: {
        id: '1',
        profileId: '1',
        username: 'Caaat!',
        // eslint-disable-next-line max-len
        avatar: 'https://media.istockphoto.com/id/1269703326/vector/pixel-art-8-bit-cute-kitten-domestic-pet-saying-meow-isolated-vector.jpg?s=612x612&w=0&k=20&c=akgp8uPlUMGNZbnO-bTAksu7f1zER53qwEXExAMirko=',
    },
    createdAt: '10.10.2000',
};
