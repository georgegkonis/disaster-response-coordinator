import { ItemRequestStatus } from '../enums/request-status.enum';
import itemRequestModel, { ItemRequest } from '../models/item-request.model';
import RequestNotFoundError from '../errors/request-not-found-error';
import { CreateItemRequestInput } from '../schemas/item-request.schema';
import { FilterQuery, QueryOptions } from 'mongoose';

export const createItemRequest = async (
    input: CreateItemRequestInput
) => {
    const request: ItemRequest = await itemRequestModel.create(input);

    return request;
};

export const findItemRequests = async (
    filter: FilterQuery<ItemRequest> = {},
    options: QueryOptions = {}
) => {
    const requests: ItemRequest[] = await itemRequestModel.find<ItemRequest>(filter, {}, options);

    return requests;
};

export const updateItemRequestStatus = async (
    id: string,
    status: ItemRequestStatus
) => {
    const request: ItemRequest | null = await itemRequestModel.findByIdAndUpdate<ItemRequest>(
        id,
        { $set: { status: status } },
        { new: true }
    );

    if (!request) throw new RequestNotFoundError(id);

    return request;
};