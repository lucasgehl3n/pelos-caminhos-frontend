import AnimalAttachmentModel from "./AnimalAttachmentModel";
import AnimalImageModel from "./AnimalImageModel";
import BreedModel from "./BreedModel";
import EntityTemporaryHome from "./EntityTemporaryHome";
import MedicineAnimal from "./MedicineAnimal";
import TreatmentModel from "./TreatmentModel";
import UserModel from "./UserModel";

export default class AnimalModel {
    id: number | null = null;
    name: string = '';
    species: number | null = null;
    age: number = 1;
    collectionDate: string | undefined;
    collectionPlace: string = '';
    size: number = 0;
    gender: number = 0;
    weight: number | undefined;
    idColor: number | undefined;
    idBreed: number | undefined;
    breed: BreedModel | undefined;
    idSituation: number = 0;
    idAdoptionUser: number | undefined;
    deathDate: string | undefined;
    deathDetail: string = '';
    adoptionDate: string | undefined;
    adoptionSolicitationDate: string = '';
    adoptionApprovalDate: string | undefined;
    adoptionUser: UserModel | undefined;
    animalImages: AnimalImageModel[] | undefined = [];
    observation: string = '';
    treatment: TreatmentModel[] = [];
    idTemporaryHome: number | undefined;
    temporaryHome: EntityTemporaryHome | undefined;
    medicineAnimal: MedicineAnimal[] = [];
    images: AnimalImageModel[] = [];
    animalAttachments: AnimalAttachmentModel[] | undefined = [];
    deletedImages: number[] = [];
    deletedAnimalAttachments: number[] = [];
    forwardingDate: string | undefined;
}


// export default class AnimalModel {
//     id: number = 0;
//     name: string = 'teste';
//     species: number = 1;
//     years: number = 1;
//     collectionDate: string = '15/10/2023';
//     collectionPlace: string = 'Sinimbu';
//     size: number = 2;
//     gender: number = 1;
//     weight: number = 0; // pendente
//     idColor: number = 1;
//     idBreed: number | undefined = 1;
//     breed: BreedModel | undefined;
//     idSituation: number = 0;
//     deathDate: string = '';
//     deathDetail: string = '';
//     adoptionDate: string = '';
//     adoptionSolicitationDate: string = '';
//     adoptionApprovalDate: string = '';
//     observation: string = '';
//     idTreatment: number | undefined;
//     idBehavioralProfile: number | undefined = 34;
//     treatment: TreatmentModel[] = [];
//     idTemporaryHome: number | undefined;
//     temporaryHome: EntityTemporaryHome | undefined;
//     medicineAnimal: MedicineAnimal[] = [];
//     images: AnimalImageModel[] = [];
//     deletedImages: number[] = [];
//     forwardingDate: string = '';
// }