"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const endeavor = require("endeavor");
const search_variables_1 = require("../graphql/variables/search.variables");
const graphql_1 = require("../graphql/graphql");
class Anilist {
    static async MediaSearch(search) {
        return new Promise((resolve, reject) => {
            const query = graphql_1.GraphQL.SearchQL;
            const variables = search_variables_1.SearchVariables.Get(search, 1, 100, "ANIME");
            endeavor
                .queryAnilist({ query, variables })
                .then(result => {
                resolve(result);
            })
                .catch(error => {
                reject(error);
            });
        });
    }
    static async MediaQuery(id) {
        return new Promise((resolve, reject) => {
            const query = graphql_1.GraphQL.AnimeQL;
            const variables = search_variables_1.SearchVariables.Media(id);
            endeavor
                .queryAnilist({ query, variables })
                .then(result => {
                resolve(result);
            })
                .catch(error => {
                console.log(error);
            });
        });
    }
}
exports.Anilist = Anilist;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5pbGlzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb3JlL2FuaWxpc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxxQ0FBc0M7QUFDdEMsNEVBQXdFO0FBQ3hFLGdEQUE2QztBQUU3QyxNQUFhLE9BQU87SUFDWCxNQUFNLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxNQUFjO1FBQzVDLE9BQU8sSUFBSSxPQUFPLENBQVMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDN0MsTUFBTSxLQUFLLEdBQUcsaUJBQU8sQ0FBQyxRQUFRLENBQUM7WUFDL0IsTUFBTSxTQUFTLEdBQUcsa0NBQWUsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDL0QsUUFBUTtpQkFDTCxZQUFZLENBQUMsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLENBQUM7aUJBQ2xDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRTtnQkFDYixPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDbEIsQ0FBQyxDQUFDO2lCQUNELEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDYixNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDaEIsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTSxNQUFNLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxFQUFVO1FBQ3ZDLE9BQU8sSUFBSSxPQUFPLENBQVMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDN0MsTUFBTSxLQUFLLEdBQUcsaUJBQU8sQ0FBQyxPQUFPLENBQUM7WUFDOUIsTUFBTSxTQUFTLEdBQUcsa0NBQWUsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDNUMsUUFBUTtpQkFDTCxZQUFZLENBQUMsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLENBQUM7aUJBQ2xDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRTtnQkFDYixPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDbEIsQ0FBQyxDQUFDO2lCQUNELEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDYixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3JCLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0Y7QUE5QkQsMEJBOEJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGVuZGVhdm9yID0gcmVxdWlyZShcImVuZGVhdm9yXCIpO1xuaW1wb3J0IHsgU2VhcmNoVmFyaWFibGVzIH0gZnJvbSBcIi4uL2dyYXBocWwvdmFyaWFibGVzL3NlYXJjaC52YXJpYWJsZXNcIjtcbmltcG9ydCB7IEdyYXBoUUwgfSBmcm9tIFwiLi4vZ3JhcGhxbC9ncmFwaHFsXCI7XG5cbmV4cG9ydCBjbGFzcyBBbmlsaXN0IHtcbiAgcHVibGljIHN0YXRpYyBhc3luYyBNZWRpYVNlYXJjaChzZWFyY2g6IHN0cmluZykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxvYmplY3Q+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IHF1ZXJ5ID0gR3JhcGhRTC5TZWFyY2hRTDtcbiAgICAgIGNvbnN0IHZhcmlhYmxlcyA9IFNlYXJjaFZhcmlhYmxlcy5HZXQoc2VhcmNoLCAxLCAxMDAsIFwiQU5JTUVcIik7XG4gICAgICBlbmRlYXZvclxuICAgICAgICAucXVlcnlBbmlsaXN0KHsgcXVlcnksIHZhcmlhYmxlcyB9KVxuICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgYXN5bmMgTWVkaWFRdWVyeShpZDogbnVtYmVyKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPG9iamVjdD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgcXVlcnkgPSBHcmFwaFFMLkFuaW1lUUw7XG4gICAgICBjb25zdCB2YXJpYWJsZXMgPSBTZWFyY2hWYXJpYWJsZXMuTWVkaWEoaWQpO1xuICAgICAgZW5kZWF2b3JcbiAgICAgICAgLnF1ZXJ5QW5pbGlzdCh7IHF1ZXJ5LCB2YXJpYWJsZXMgfSlcbiAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfVxufVxuIl19