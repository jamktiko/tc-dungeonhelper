import { inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { EserviceService } from './eservice.service';
import { RandomEncounters } from './types';
import { tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

type EncounterStoreState = {
  isLoading: boolean;
  enc: RandomEncounters[];
};

const initialState: RandomEncounters = {
  isLoading: false,
  enc: [],
};

export const randomEncounterStore = signalStore(
  {
    providedIn: 'root',
  },
  withHooks({
    onInit(store, eservice = inject(EserviceService)) {
      eservice
        .getTable()
        .pipe(
          takeUntilDestroyed(),
          tap((e) => store.patchState({ enc: e }))
        )
        .subscribe();
    },

    onDestroy(store) {
      console.log('RandomEncountersit poistettu muistista', store);
    },
  })
);
