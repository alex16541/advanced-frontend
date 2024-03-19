import { ArticleBlockType, ArticleType } from '../model/consts/article';
import { Article } from '../model/types/article';

export const article: Article = {
    id: '1',
    title: 'Some long long long test title',
    img: 'tests/Background.jpg',
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
        avatar: 'tests/Avatar.jpeg',
    },
    createdAt: '10.10.2000',
};
