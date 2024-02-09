import itemRequestModel, { ItemRequest } from '../models/item-request.model';
import { FilterQuery, QueryOptions } from 'mongoose';
import NotFoundError from '../errors/not-found-error';

export const createItemRequest = async (
    input: ItemRequest
) => {
    const request: ItemRequest = await itemRequestModel.create(input);

    return request;
};

export const getItemRequest = async (
    id: string
) => {
    const request: ItemRequest | null = await itemRequestModel.findById(id).lean();

    if (!request) throw new NotFoundError('item request', id);

    return request;
};

export const findItemRequests = async (
    filter: FilterQuery<ItemRequest> = {},
    options: QueryOptions = {}
) => {
    const requests: ItemRequest[] = await itemRequestModel.find<ItemRequest>(filter, {}, options);

    return requests;
};

export const updateItemRequest = async (
    id: string,
    input: Partial<ItemRequest>
) => {
    const request: ItemRequest | null = await itemRequestModel.findByIdAndUpdate(id, input, { new: true });

    if (!request) throw new NotFoundError('item request', id);

    return request;
};

export const deleteItemRequest = async (
    id: string
) => {
    await itemRequestModel.findByIdAndDelete(id);
}