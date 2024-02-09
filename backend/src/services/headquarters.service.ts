import headquartersModel, { Headquarters } from '../models/headquarters.model';
import { FilterQuery, QueryOptions } from 'mongoose';

export const createHeadquarters = async (
    input: Headquarters
) => {
    const headquarters: Headquarters = await headquartersModel.create<Headquarters>(input);

    return headquarters;
};

export const findHeadquarters = async (
    filter: FilterQuery<Headquarters>,
    options: QueryOptions = {}
) => {
    const headquarters: Headquarters[] = await headquartersModel.find<Headquarters>(filter, {}, options);

    return headquarters;
};

export const deleteHeadquarters = async (
    id: string
) => {
    await headquartersModel.findByIdAndDelete(id);
};