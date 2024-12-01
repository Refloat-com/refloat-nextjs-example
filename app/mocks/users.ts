import { User } from 'refloat-nextjs-integration/app/types';

const bronzePlanUsers: User[] = [
  {
    id: 'test_cus_OTk5MjY0ZGYt',
    name: 'Test Joe',
    imgSrc: 'https://avataaars.io/?avatarStyle=Circle&topType=ShortHairDreads01&accessoriesType=Round&hairColor=Black&facialHairType=MoustacheMagnum&facialHairColor=Brown&clotheType=BlazerSweater&eyeType=Close&eyebrowType=RaisedExcitedNatural&mouthType=Serious&skinColor=Yellow',
    plan: 'test_plan_yearly_eur_Mzg2NDAy',
    subscriptionId: 'sub_1PvH2P2LIpZD30QtsBTZdoUG'
  },
  {
    id: 'test_cus_MDc3MDIyOGYt',
    name: 'Test Jane',
    imgSrc: 'https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light',
    plan: 'test_plan_yearly_eur_Mzg2NDAy'
  },
  {
    id: 'test_cus_ZjUxNjA0ODUt',
    name: 'Test Jenny',
    imgSrc: 'https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraightStrand&accessoriesType=Prescription01&hairColor=SilverGray&facialHairType=Blank&clotheType=BlazerSweater&eyeType=Surprised&eyebrowType=AngryNatural&mouthType=Default&skinColor=Tanned',
    plan: 'test_plan_yearly_eur_Mzg2NDAy'
  },
];

const silverPlanUsers: User[] = [
  {
    id: 'test_cus_NTBlNmJjNDQt',
    name: 'Test Doe',
    imgSrc: 'https://avataaars.io/?avatarStyle=Circle&topType=WinterHat4&accessoriesType=Prescription01&hatColor=Heather&facialHairType=BeardMajestic&facialHairColor=Auburn&clotheType=CollarSweater&clotheColor=Blue02&graphicType=Diamond&eyeType=Close&eyebrowType=Default&mouthType=Default&skinColor=Pale',
    plan: 'test_plan_yearly_eur_NWE5Njkz',
    subscriptionId: 'sub_1PvH2P2LIpZD30QtsBTZdoUG'
  },
  {
    id: 'test_cus_ZDEwZDVjNDct',
    name: 'Test Mike',
    imgSrc: 'https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortFlat&accessoriesType=Wayfarers&hairColor=Brown&facialHairType=BeardLight&facialHairColor=Auburn&clotheType=BlazerShirt&eyeType=Side&eyebrowType=SadConcernedNatural&mouthType=Serious&skinColor=Brown',
    plan: 'test_plan_yearly_eur_NWE5Njkz'
  },
  {
    id: 'test_cus_Y2MwZWMzYzkt',
    name: 'Test Anne',
    imgSrc: 'https://avataaars.io/?avatarStyle=Circle&topType=LongHairFrida&accessoriesType=Kurt&facialHairType=Blank&clotheType=ShirtCrewNeck&clotheColor=White&eyeType=Side&eyebrowType=FlatNatural&mouthType=Twinkle&skinColor=Brown',
    plan: 'test_plan_yearly_eur_NWE5Njkz'
  },
];

const goldPlanUsers: User[] = [
  {
    id: 'test_cus_YTVkM2Q1YTAt',
    name: 'Test Terry',
    imgSrc: 'https://avataaars.io/?avatarStyle=Circle&topType=Hat&accessoriesType=Sunglasses&facialHairType=MoustacheFancy&facialHairColor=Red&clotheType=ShirtScoopNeck&clotheColor=Heather&eyeType=Default&eyebrowType=FlatNatural&mouthType=Serious&skinColor=Tanned',
    plan: 'test_plan_yearly_eur_YTkyOGJh',
    subscriptionId: 'sub_1PvGnu2LIpZD30QthlLf7CUI'
  },
  {
    id: 'test_cus_N2M1NDcwYzQt',
    name: 'Test Rose',
    imgSrc: 'https://avataaars.io/?avatarStyle=Circle&topType=LongHairBun&accessoriesType=Prescription02&hairColor=BlondeGolden&facialHairType=Blank&clotheType=Hoodie&clotheColor=Blue03&eyeType=Default&eyebrowType=Default&mouthType=Smile&skinColor=Tanned',
    plan: 'test_plan_yearly_eur_YTkyOGJh'
  },
  {
    id: 'test_cus_Y2JlOGNhYjYt',
    name: 'Test Tom',
    imgSrc: 'https://avataaars.io/?avatarStyle=Circle&topType=NoHair&accessoriesType=Sunglasses&facialHairType=BeardMedium&facialHairColor=Blonde&clotheType=ShirtScoopNeck&clotheColor=Red&eyeType=Surprised&eyebrowType=RaisedExcitedNatural&mouthType=Serious&skinColor=Light',
    plan: 'test_plan_yearly_eur_YTkyOGJh',
  },
];

export const users: User[] = bronzePlanUsers
  .concat(silverPlanUsers)
  .concat(goldPlanUsers);
