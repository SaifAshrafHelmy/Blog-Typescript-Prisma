import { NextFunction, Request, Response } from 'express';
import MessageResponse from '../../interfaces/MessageResponse.js';
import { PrismaClient } from '@prisma/client';
import { CreateUserDTO, LoginUserDTO } from './users.model.js';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export const registerUser = async (
  req: Request,
  res: Response<MessageResponse>,
  next: NextFunction
) => {
  try {
    const createUserDTO = await CreateUserDTO.parseAsync(req.body);
    const duplicateEmail = await checkIfEmailUsed(createUserDTO.email);
    if (duplicateEmail) {
      return res
        .status(403)
        .json({ message: 'A user with that email already exists.' });
    }

    // hash the password
    const hashedPassword = await bcrypt.hash(createUserDTO.password, 12);

    const user = await prisma.user.create({
      data: {
        email: createUserDTO.email,
        password: hashedPassword,
        name: createUserDTO.name,
      },
    });
    req.session.user = user;

    res.json({ message: 'User successfully registered.' });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (
  req: Request,
  res: Response<MessageResponse>,
  next: NextFunction
) => {
  if (req.session.user) {
    return res.json({
      message: `You are already logged in as ${req.session.user.name}.`,
    });
  }
  try {
    const loginUserDTO = await LoginUserDTO.parseAsync(req.body);

    const user = await prisma.user.findUnique({
      where: {
        email: loginUserDTO.email,
      },
    });
    if (!user) {
      return res.json({ message: 'User not found.' });
    }
    const isRightPassword = await bcrypt.compare(
      loginUserDTO.password,
      user.password
    );
    if (!isRightPassword) {
      return res.json({ message: 'Wrong password.' });
    }
    req.session.user = user;

    res.json({ message: 'User successfully logged in.' });
  } catch (error) {
    next(error);
  }
};

export const logoutUser = (req: Request, res: Response<MessageResponse>) => {
  // TODO: implement CSRF
  if (req.session.user) {
    req.session.destroy((err) => {});
    res.clearCookie('connect.sid');
    res.json({ message: 'User successfully logged out.' });
  } else {
    res.json({ message: 'You are not logged in' });
  }
};

const checkIfEmailUsed = async (email: string) => {
  try {
    const potentialUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    return potentialUser;
  } catch (error) {
    throw new Error('Failed to check email uniqueness');
  }
};
