import InterestModel from "../../../structures/Models/InterestModel";
import { Interests } from "../../../enums/Interests";
import UserModel from "structures/Models/UserModel";
let context: any = null;
export default class InterestsControlForm{
    form: UserModel;
    constructor(form: UserModel) {
        this.form = form;
        context = this;
    }
    
    mapInterest(interestIdentifier: Interests){
        const interestModel = new InterestModel();
        interestModel.idInterest = interestIdentifier;
        return interestModel;
    }
    
    removeInterest(interestIdentifier: Interests){
        context.form.interests = context.form.interests.filter(
            (interest: { idInterest: Interests; }) => interest.idInterest !== interestIdentifier
        );
    }
    
    removeDontKnowInterest(){
        context.removeInterest(Interests.DontKnow);
    };
    
    checkInterestClicked(interestIdentifier: Interests){
        return context.form.interests.some(
            (interest: { idInterest: Interests; }) => interest.idInterest === interestIdentifier
        );
    }

    addInterest(interestIdentifier: Interests){
        if (context.checkInterestClicked(interestIdentifier)) {
            context.removeInterest(interestIdentifier);
            return;
        }
    
        if (interestIdentifier === Interests.DontKnow) {
            context.form.interests = [];
        }
        else {
            context.removeDontKnowInterest();
        }
    
        context.form.interests.push(context.mapInterest(interestIdentifier));
    }
}