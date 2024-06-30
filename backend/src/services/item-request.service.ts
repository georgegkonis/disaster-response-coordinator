import itemRequestModel, { ItemRequest } from '../models/item-request.model';
import { FilterQuery, QueryOptions } from 'mongoose';
import NotFoundError from '../errors/not-found-error';

const populate: string[] = ['item', 'rescuer', 'citizen'];

export const createItemRequest = async (
    input: ItemRequest
) => {
    let itemRequest: ItemRequest = await itemRequestModel.create<ItemRequest>(input);

    itemRequest = await getItemRequest(itemRequest._id!.toHexString());

    return itemRequest;
};

export const getItemRequest = async (
    id: string
) => {
    const options: QueryOptions = { populate };
    const request: ItemRequest | null = await itemRequestModel.findById<ItemRequest>(id, {}, options);

    if (!request) throw new NotFoundError('item request', id);

    return request;
};

export const findItemRequests = async (
    filter: FilterQuery<ItemRequest> = {}
) => {
    const options: QueryOptions = { populate };
    const requests: ItemRequest[] = await itemRequestModel.find<ItemRequest>(filter, {}, options);

    return requests;
};

export const updateItemRequest = async (
    id: string,
    input: Partial<ItemRequest>
) => {
    const options: QueryOptions = { new: true, populate };
    const request: ItemRequest | null = await itemRequestModel.findByIdAndUpdate<ItemRequest>(id, input, options);

    if (!request) throw new NotFoundError('item request', id);

    return request;
};

export const deleteItemRequest = async (
    id: string
) => {
    await itemRequestModel.findByIdAndDelete<ItemRequest>(id);
};