import { EntityManager } from "typeorm";
import { User } from "./user.entity";
import { Injectable } from "@nestjs/common";
import { AbstractRepository } from "src/utils/repository.absract";


@Injectable()
export class UserRepository extends AbstractRepository<User>{
    constructor(
        protected readonly entityManager: EntityManager
    ){
        super(User,entityManager)
    }

    // TODO: custom repository
}